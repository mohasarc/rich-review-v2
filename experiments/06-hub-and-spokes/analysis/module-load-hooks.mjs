export async function resolve(specifier, context, nextResolve) {
  const result = await nextResolve(specifier, context);
  if (result.url.includes("/packages/daemon/dist/")) console.log("LOAD", result.url.split("/packages/daemon/dist/")[1]);
  return result;
}
