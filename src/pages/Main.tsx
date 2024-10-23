import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import PageTitle from '../Components/PageTitle';
import ECommerce from './Dashboard/ECommerce';
import Calendar from './Calendar';
import Attendance from './Attendance';
import Task from './LeadList';
import Call from './Call';
import Products from './Products'
import Sales from './Sales';
import Topproduct from './TopProducts';
import Mostpopular from './MostPopular';
import Getoffer from './Getoffer'
import Globalnotification from './GlobalNotification';
import Banners from './Banners'
import Sendnotificaion from './SendNotification';
import Uploadproducts from './UploadProducts';
import Viewproduct from './ViewProduct';
import Profile from './Profile';
import Stock from './Stock'




const Main = () => {
  return (
    <DefaultLayout>

      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Admin Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />

        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />


        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              < Profile />
            </>
          }
        />


        <Route
          path="/upload"
          element={
            <>
              <PageTitle title="upload | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              < Uploadproducts />
            </>
          }
        />



        <Route
          path="/stock"
          element={
            <>
              <PageTitle title="upload | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              < Stock />
            </>
          }
        />


        <Route
          path="/viewproduct/:id"
          element={
            <>
              <PageTitle title="View | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Viewproduct />
            </>
          }
        />




        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />




        <Route
          path="/getoffers"
          element={
            <>
              <PageTitle title="Offer |  Dashboard " />
              <Getoffer />
            </>
          }
        />


        <Route
          path="/sendnotification"
          element={
            <>
              <PageTitle title="Notification |  Dashboard " />
              <Sendnotificaion />
            </>
          }
        />





        <Route
          path="/mostpopular"
          element={
            <>
              <PageTitle title="Products| TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Mostpopular />
            </>
          }
        />

        <Route
          path="globalnotification"
          element={
            <>
              <PageTitle title="Products | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Globalnotification />
            </>
          }
        />

        <Route
          path="banners"
          element={
            <>
              <PageTitle title="Products | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Banners />
            </>
          }
        />







        <Route
          path="sellingproduct"
          element={
            <>
              <PageTitle title="Products | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Attendance />
            </>
          }
        />

        <Route
          path="/call"
          element={
            <>
              <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Call />
            </>
          }
        />


        <Route
          path="/sales"
          element={
            <>
              <PageTitle title="Counseller | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Sales />
            </>
          }
        />

        <Route
          path="/products"
          element={
            <>
              <PageTitle title="Products | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Products />
            </>
          }
        />
        <Route
          path="/topproduct"
          element={
            <>
              <PageTitle title="Products | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Topproduct />
            </>
          }
        />



        <Route
          path="/user"
          element={
            <>
              <PageTitle title="User | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Task />
            </>
          }
        />




      </Routes>

    </DefaultLayout >
  );
}

export default Main;
