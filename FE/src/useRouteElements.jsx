import { useRoutes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomeLayout from './layouts/HomeLayout';
import TrangChu from './pages/TrangChu/TrangChu';
import AddData from './pages/AddData/AddData';
import GioiThieuWeb from './pages/GioiThieuWeb/GioiThieuWeb';
import AddDataLayouts from './layouts/AddDataLayout';
import Loading from './pages/Loading/Loading';

// Component để cập nhật title
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}

export default function useRouteElements() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Hook để quản lý việc hiển thị Loading khi thay đổi route
  useEffect(() => {
    setLoading(true);

    // Giả lập độ trễ 1 giây để hiển thị loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Cleanup timer khi component unmount
    return () => clearTimeout(timer);
  }, [location]);

  // Routes của bạn với từng page
  const routeElements = useRoutes([
    {
      path: '/com',
      element: (
        <>
          <PageTitle title="Home Page" />
          <HomeLayout>
            <TrangChu />
          </HomeLayout>
        </>
      )
    },
    {
      path: '/',
      element: (
        <>
          <PageTitle title="Fitness & Health" />
          <AddDataLayouts>
            <GioiThieuWeb />
          </AddDataLayouts>
        </>
      )
    },
    {
      path: '/body-building',
      element: (
        <>
          <PageTitle title="Body Building" />
        
            <AddData />
          
        </>
      )
    }
  ]);

  // Trả về Loading component nếu đang trong quá trình loading, ngược lại render nội dung
  return (
    <>
      {loading ? <Loading /> : routeElements}
    </>
  );
}
