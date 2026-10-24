function unescapeXml(s) {
  if (!s) return '';
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}

function getTagContent(xml, tag) {
  const re = new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)</' + tag + '>', 'i');
  const m = xml.match(re);
  if (!m) return '';
  return unescapeXml(m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, '$1').trim());
}

function getAttr(xml, tag, attr) {
  const re = new RegExp('<' + tag + '[^>]+?' + attr + '\\s*=\\s*["\']([^"\']+)["\']', 'i');
  const m = xml.match(re);
  return m ? unescapeXml(m[1]) : '';
}

function parseRss(xml) {
  const items = [];
  const reItem = /<item[\s\S]*?<\/item>/gi;
  let m;
  while ((m = reItem.exec(xml)) !== null) {
    const itemXml = m[0];
    const title = getTagContent(itemXml, 'title');
    const link = getTagContent(itemXml, 'link') || getAttr(itemXml, 'link', 'href');
    const description = getTagContent(itemXml, 'description') || getTagContent(itemXml, 'content:encoded') || getTagContent(itemXml, 'summary') || getTagContent(itemXml, 'content');
    const pubDate = getTagContent(itemXml, 'pubDate') || getTagContent(itemXml, 'dc:date') || getTagContent(itemXml, 'published') || getTagContent(itemXml, 'updated');
    let image = '';
    const enclosure = itemXml.match(/<enclosure[^>]+url=['"]([^'"]+)['"][^>]*>/i);
    if (enclosure) image = unescapeXml(enclosure[1]);
    if (!image) {
      const media = itemXml.match(/<media:(?:content|thumbnail)[^>]+url=['"]([^'"]+)['"][^>]*>/i) || itemXml.match(/<media:thumbnail[^>]+url=['"]([^'"]+)['"][^>]*>/i);
      if (media) image = unescapeXml(media[1]);
    }
    if (!image) {
      const itunes = itemXml.match(/<itunes:image[^>]+href=['"]([^'"]+)['"][^>]*>/i);
      if (itunes) image = unescapeXml(itunes[1]);
    }
    if (!image && description) {
      const imgm = description.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/i);
      if (imgm) image = unescapeXml(imgm[1]);
    }
    if (title && link) {
      items.push({ title, link, description, pubDate, image, enclosure: image ? { url: image } : undefined });
    }
  }
  if (items.length === 0) {
    const reEntry = /<entry[\s\S]*?<\/entry>/gi;
    while ((m = reEntry.exec(xml)) !== null) {
      const entryXml = m[0];
      const title = getTagContent(entryXml, 'title');
      let link = getAttr(entryXml, 'link', 'href');
      if (!link) link = getTagContent(entryXml, 'link');
      const description = getTagContent(entryXml, 'summary') || getTagContent(entryXml, 'content') || '';
      const pubDate = getTagContent(entryXml, 'published') || getTagContent(entryXml, 'updated');
      let image = '';
      const media = entryXml.match(/<media:(?:content|thumbnail)[^>]+url=['"]([^'"]+)['"][^>]*>/i);
      if (media) image = unescapeXml(media[1]);
      if (!image && description) {
        const imgm = description.match(/<img[^>]+src=['"]([^'"]+)['"][^>]*>/i);
        if (imgm) image = unescapeXml(imgm[1]);
      }
      if (title && link) {
        items.push({ title, link, description, pubDate, image, enclosure: image ? { url: image } : undefined });
      }
    }
  }
  return items;
}

module.exports = { parseRss, unescapeXml };
