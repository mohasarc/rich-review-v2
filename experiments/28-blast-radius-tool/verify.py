#!/usr/bin/env python3
"""Check the counting contract and the provenance of the saved artifact."""
import hashlib
import json
from pathlib import Path
import unittest
from blast_radius import file_kind, measure, validate_response

HERE = Path(__file__).resolve().parent

def ref(file, line=1, kind='usage'):
    return dict(file=file, line=line, matchStart=0, matchEnd=4, kind=kind, previewSource='demo')

def record(target, refs):
    return {'target': target, 'response': {'references': refs}}

class CountingContract(unittest.TestCase):
    def test_overlapping_seeds_and_repeated_locations_count_one_file(self):
        refs = [ref('app/caller.ts', 4), ref('app/caller.ts', 9, 'type')]
        measured = measure([record('app/a.ts::A', refs), record('app/b.ts::B', refs)], True)
        self.assertEqual(measured['production'], ['app/caller.ts'])
        self.assertEqual(len(measured['files'][0]['refs']), 2)
        self.assertEqual(len(measured['files'][0]['refs'][0]['via']), 2)

    def test_declaration_files_are_excluded_across_the_whole_seed_set(self):
        measured = measure([record('app/a.ts::A', [ref('app/b.ts')]),
                            record('app/b.ts::B', [ref('app/a.ts')])], True)
        self.assertEqual(measured['production'], [])
        self.assertEqual(measured['internalFilesExcluded'], ['app/a.ts', 'app/b.ts'])

    def test_tests_and_build_outputs_do_not_enter_production_radius(self):
        refs = [ref('apps/cli/src/a.test.ts'), ref('apps/cli/test/helpers/a.ts'),
                ref('packages/testing/fixtures/a.ts'), ref('meta-tests/src/a.ts'),
                ref('apps/cli/dist/a.js'), ref('packages/core/dist/a.d.ts'), ref('app/runtime.ts')]
        measured = measure([record('app/a.ts::A', refs)], True)
        self.assertEqual(measured['production'], ['app/runtime.ts'])
        self.assertEqual(len(measured['test']), 4)
        self.assertEqual(len(measured['generatedFilesExcluded']), 2)
        self.assertEqual(file_kind('app/protest.ts'), 'production')

    def test_usage_filter_drops_type_and_import_only_files(self):
        measured = measure([record('app/a.ts::A', [ref('app/type.ts', kind='type'),
                            ref('app/import.ts', kind='import'), ref('app/use.ts')])], False)
        self.assertEqual(measured['production'], ['app/use.ts'])

    def test_zero_refs_is_valid_but_wrong_identity_and_pagination_fail(self):
        raw = {'identity': {'file': 'app/a.ts', 'segments': [{'name': 'A'}]},
               'total': 0, 'page': 1, 'pageCount': 0, 'references': []}
        validate_response(raw, 'app/a.ts::A')
        with self.assertRaises(ValueError): validate_response(raw, 'app/a.ts::B')
        with self.assertRaises(ValueError): validate_response({**raw, 'total': 10}, 'app/a.ts::A')
        with self.assertRaises(ValueError): validate_response({**raw, 'pageCount': 2}, 'app/a.ts::A')

class SavedArtifact(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.report = json.loads((HERE / 'data/report.json').read_text())
        cls.manifest = json.loads((HERE / 'decisions.json').read_text())

    def test_input_fingerprints_and_diff_size(self):
        self.assertEqual(self.report['manifestSha256'], hashlib.sha256((HERE/'decisions.json').read_bytes()).hexdigest())
        bundle = HERE.parents[1]/'inputs/pr-131/diff.patch'
        self.assertEqual(self.report['diffSha256'], hashlib.sha256(bundle.read_bytes()).hexdigest())
        self.assertEqual(len(self.report['files']), 60)
        self.assertEqual(sum(f['added'] for f in self.report['files']), 1298)
        self.assertEqual(sum(f['removed'] for f in self.report['files']), 544)

    def test_every_changed_file_and_decision_is_reachable(self):
        ids = {d['id'] for d in self.report['decisions']}
        self.assertEqual(len(ids), 15)
        for file in self.report['files']:
            self.assertTrue(file['decisions'])
            self.assertLessEqual(set(file['decisions']), ids)
        for d in self.report['decisions']:
            self.assertTrue(d['summary'])
            self.assertIn(d['reason']['status'], ['stated', 'unexplained'])
            self.assertTrue(d['evidence'])
            self.assertTrue(d['changedFiles'])

    def test_saved_metrics_match_raw_unions_and_pinned_revisions(self):
        queries = set()
        for d in self.report['decisions']:
            for side in ['base', 'head']:
                records = []
                for q in d['queries'][side]:
                    raw = json.loads((HERE/q['rawFile']).read_text())
                    queries.add(q['rawFile'])
                    validate_response(raw['response'], q['target'])
                    self.assertEqual(raw['sha'], self.report['revisions'][side])
                    self.assertEqual(raw['environment']['SYMNAV_DAEMON'], '0')
                    records.append(raw)
                for mode in ['all', 'usage']:
                    self.assertEqual(d['metrics'][side][mode], measure(records, mode=='all'))
        self.assertEqual(len(queries), self.report['queryCount'])

    def test_every_excerpt_and_reference_preview_matches_source(self):
        loaded = {}
        def lines(side, file):
            key = (side, file)
            if key not in loaded:
                loaded[key] = (HERE.parents[1]/f'worktrees/pr-131-{side}'/file).read_text().splitlines()
            return loaded[key]
        for d in self.report['decisions']:
            for e in d['evidence']:
                self.assertEqual(e['lines'], lines(e['side'],e['file'])[e['start']-1:e['end']])
        for path in (HERE/'data/refs').glob('*.json'):
            raw = json.loads(path.read_text())
            for r in raw['response']['references']:
                actual = lines(raw['side'],r['file'])[r['line']-1]
                self.assertEqual(r['previewSource'], actual, f'{path}: {r}')

    def test_zero_radius_and_unmeasured_are_not_conflated(self):
        by_id = {d['id']:d for d in self.report['decisions']}
        error = by_id['error-provenance']
        self.assertNotIn('unmeasured',error)
        self.assertEqual(error['metrics']['head']['all']['production'],[])
        self.assertTrue(error['queries']['head'])
        deletion = by_id['removed-tests']
        self.assertTrue(deletion['unmeasured'])
        self.assertEqual(deletion['queries']['head'],[])

if __name__ == '__main__':
    unittest.main(verbosity=2)
