import fetch from 'node-fetch';

export default async function handler(request, response) {
  const { gc } = request.query;

  if (gc === '' || gc.length > 7) return response.status(400).json({ success: false });

  const gcResponse = await fetch('https://www.geocaching.com/geocache/GC' + gc);
  const data = await gcResponse.text();

  const name = data.match(/(?<=<div id="divContentMain" class="span-24&#32;last">\s*<h1 class="visually-hidden">).{1,70}(?=<\/h1>)/);
  const link = data.match(/(?<=<form method="post" action=")\/geocache\/.{1,60}(?=" id="aspnetForm">)/);
  const [difficulty, terrain] = data.match(/(?<=alt=").{1,3}(?= out of 5")/g) ?? [undefined, undefined];
  const size = data.match(/(?<=&nbsp<small>\().{1,20}(?=\)<\/small><\/span>)/);

  const success = name !== null;

  if (!success) return response.status(404).json({ success: false });

  return response.status(200).json({
    success: true,
    data: {
      name,
      link: 'https://www.geocaching.com/' + link,
      difficulty,
      terrain,
      size,
    },
  });
}
