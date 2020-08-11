import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { GlobalContext } from '../contexts/GlobalContextWrapper';

const useDiscordData = (resource, userType) => {
  const history = useHistory();
  const { DiscordStore } = useContext(GlobalContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    // A flag to make sure state does not change when the component is not mounted
    let isMounted = true;

    DiscordStore.getData(resource, userType).then((res) => {
      if (isMounted) {
        setData(res);
      }
    }).catch((e) => {
      const error = `${userType + resource} - DiscordStore.getData - "${e.toString()}"`;

      history.push({
        pathname: '/error',
        state: {
          error,
        },
      });
    });

    // The return function is called when the component has unmounted
    return () => {
      isMounted = false;
    };
  }, [setData]);

  return data;
};

export default useDiscordData;
