// ShareHandler.js

import { useEffect, useState } from 'react';

const useShareHandler = (nodes, edges) => {
  const [shareableLink, setShareableLink] = useState('');

  useEffect(() => {
    const saveCurrentState = () => {
      const encodedNodes = encodeURIComponent(JSON.stringify(nodes));
      const encodedEdges = encodeURIComponent(JSON.stringify(edges));
      const url = `${window.location.origin}?nodes=${encodedNodes}&edges=${encodedEdges}`;
      setShareableLink(url);
    };

    saveCurrentState();
  }, [nodes, edges]);

  return shareableLink;
};

export default useShareHandler;
