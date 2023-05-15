export async function get_veiculos() {
  const response = await fetch("http://127.0.0.1:8000/veiculolista");
  const json = await response.json();
  // return json;
  return new Promise((resolve) => resolve(json));
}
