import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AcceptUser } from "../../redux/actions/owner_action";
import notify from "../notfiy";

const acceptRefuse = () => {
  const [loading, setLoading] = useState(true);
  const [loadingRefuse, setLoadingRefuse] = useState(true);
  const dispatch = useDispatch();

  const accept = async (id) => {
    setLoading(true);
    await dispatch(
      AcceptUser({
        id: id,
        accept: true,
      })
    );
    setLoading(false);
  };
  const Refuse = async (id) => {
    setLoadingRefuse(true);
    await dispatch(
      AcceptUser({
        id: id,
        accept: false,
      })
    );
    setLoadingRefuse(false);
  };

  const res = useSelector((item) => item.Owner.accept);

  useEffect(() => {
    if (loading === false) {
      if (res && res.status === 200) {
        notify("It has been accepted", "success");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  }, [loading]);
  useEffect(() => {
    if (loadingRefuse === false) {
      if (res && res.status === 200) {
        notify("It has been deleted", "warn");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  }, [loadingRefuse]);

  return [accept, Refuse];
};

export default acceptRefuse;
