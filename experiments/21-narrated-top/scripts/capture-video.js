async (page) => {
  // Run with the Playwright MCP browser_run_code_unsafe filename parameter.
  // python3 serve.py --port 8721 must serve the experiment.
  const output = '/Users/moyaseen/projects/rich-review-v2/experiments/21-narrated-top';
  const context = await page.context().browser().newContext({
    viewport: {width:1280,height:720}, deviceScaleFactor:1,
  });
  const film = await context.newPage();
  try {
    await film.goto('http://127.0.0.1:8721/film.html?render=1', {waitUntil:'networkidle'});
    const fps=12, total=90*fps;
    for(let frame=0;frame<total;frame++){
      await film.evaluate(t=>setFilmTime(t),frame/fps);
      await film.screenshot({path:`${output}/.render/frames/${String(frame).padStart(5,'0')}.png`,animations:'disabled'});
    }
    return {frames:total,fps,width:1280,height:720,duration:90};
  } finally { await context.close(); }
}
