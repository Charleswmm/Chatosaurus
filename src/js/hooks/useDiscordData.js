import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { GlobalContext } from '../contexts/GlobalContextWrapper';

const useDiscordData = (resource = '', userType = 'bot') => {
  const history = useHistory();
  const { DiscordStore } = useContext(GlobalContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    // A flag to make sure state does not change when the component is not mounted
    let isMounted = true;

    if (!resource.includes('pending')) {
      DiscordStore.getData(resource, userType).then((res) => {
        if (isMounted) {
          setData(res);
        }
      }).catch((e) => {
        const error = `${resource.toString()} - DiscordStore.getData - "${e.toString()}"`;

        history.push({
          pathname: '/error',
          state: {
            error,
          },
        });
      });
    }

    // The return function is called when the component has unmounted
    return () => {
      isMounted = false;
    };
  }, [resource]);

  return data;
};

export default useDiscordData;
