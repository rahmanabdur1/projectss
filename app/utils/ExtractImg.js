const ownUrl = process.env.NEXT_PUBLIC_OWN_URL;
const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;

export const extractImage = (html) => {
  const match = html.match(/<img[^>]+src="([^">]+)"/);

  if (match && match[1]) {
    const src = match[1];
    return src.replace(`${ownUrl}api/uploads`, `${cmsUrl}api/uploads`);
  }

  return null;
};
