function generateMagnetLink(infoHash, displayName, trackers = [
    "udp://open.demonii.com:1337/announce",
    "udp://tracker.openbittorrent.com:80",
    "udp://tracker.coppersurfer.tk:6969",
    "udp://glotorrents.pw:6969/announce",
    "udp://tracker.opentrackr.org:1337/announce",
    "udp://torrent.gresille.org:80/announce",
    "udp://p4p.arenabg.com:1337",
    "udp://tracker.leechers-paradise.org:6969",
  ]) {
  let magnetLink = `magnet:?xt=urn:btih:${infoHash}&dn=${encodeURIComponent(
    displayName
  )}`;

  if (trackers.length > 0) {
    const encodedTrackers = trackers
      .map((tracker) => encodeURIComponent(tracker))
      .join("&tr=");
    magnetLink += `&tr=${encodedTrackers}`;
  }

  return magnetLink;
}

module.exports = {
  generateMagnetLink,
};
