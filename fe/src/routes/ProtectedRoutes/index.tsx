import React, { useEffect, useContext, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Modal, Button } from "antd";

interface ProtectedRouteProps {}

const AuthWarningModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <Modal
    title="Authentication Required"
    open={true}
    onOk={onClose}
    footer={[
      <Button key="submit" type="primary" onClick={onClose}>
        OK
      </Button>,
    ]}
  >
    You need to log in to access this page.
  </Modal>
);

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext)!;
  const [modalShown, setModalShown] = useState(false);

  const isFirstRender = useRef(true);

  const handleModalClose = () => {
    setModalShown(false);
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    // console.log("Auth status changed. Is loading:", auth.isLoading, "Is authenticated:", auth.isAuthenticated);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    if (!auth.isLoading) {
      timer = setTimeout(() => {
        if (!auth.isAuthenticated) {
          setModalShown(true);
        } else {
          setModalShown(false);
        }
      }, 1000);
    }

    // Bersihkan timer jika komponen di-unmount
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [auth.isAuthenticated, auth.isLoading]);

  return (
    <>
      {modalShown && <AuthWarningModal onClose={handleModalClose} />}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
