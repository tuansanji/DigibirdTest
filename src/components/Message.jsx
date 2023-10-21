import { message } from "antd";
import { useEffect, useRef } from "react";

const useMessageApi = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const messageRef = useRef(messageApi);

  useEffect(() => {
    messageRef.current = messageApi;
  }, [messageApi]);

  const showMessage = (type, content, duration) => {
    messageRef.current.open({
      key: 9999,
      type,
      content,
      duration,
    });
  };

  return { showMessage, contextHolder };
};

export default useMessageApi;
