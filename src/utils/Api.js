export async function randomParagraphGenerator() {
    const URL = 'https://hipsum.co/api/?type=hipster-centric&sentences=18'
    const res = await fetch(URL);
    const data = await res.json();
    return data[0];
}