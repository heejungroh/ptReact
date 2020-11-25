import { Route, Switch } from 'react-router-dom';
import PtHome from './pages/PtHome';
import ProfileHome from './pages/ProfileHome';
import Cart from './pages/user/Cart';
import MyPage from './pages/user/OrderPage';
import OrderPage from './pages/user/OrderPage';
import Account from './pages/user/Account';
import Header from './components/Header';
import Footer from './components/Footer';
import Shop from './pages/pt_list/Shop';
import List from './pages/pt_list/List';
import Etc from './pages/Etc';
import Admin from './pages/user/Admin';
import Card from './pages/board/CardForm';
import PtRegister from './pages/board/PtRegister';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from './store';
import BoardList from './pages/board/BoardList';
import BoardWrite from './pages/board/BoardWrite';
import BoardDetail from './pages/board/BoardDetail';
import BoardUpdate from './pages/board/BoardUpdate';
import ProfileRegister from './pages/board/ProfileRegister';
import StdShop from './pages/pt_list/StdShop';








function App() {

  

  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("Authorization")!= null){
      dispatch(login());
    }
    },[]);

  
  return (
   <div>
     <Header/>
     <Switch>        
        <Route path="/" exact={true} component={PtHome}/>
        <Route path="/ptList" exact={true} component={List}/>
        <Route path="/profilehome" exact={true} component={ProfileHome}/>
        <Route path="/orderPage" exact={true} component={OrderPage}/>
        <Route path="/cart" exact={true} component={Cart}/>
        <Route path="/card" exact={true} component={Card}/>
        <Route path="/ptRegister" exact={true} component={PtRegister}/>
        <Route path="/shop/:id" exact={true} component={Shop} />
        <Route path="/stshop/:id" exact={true} component={StdShop} />
        <Route path="/boardlist" exact={true} component={BoardList} />
        <Route path="/boardWrite" exact={true} component={BoardWrite}/>
        <Route path="/boardDetail/:no" exact={true} component={BoardDetail}/>
        <Route path="/boardUpdate/:no" exact={true} component={BoardUpdate}/>
        <Route path="/profileregister" exact={true} component={ProfileRegister}/>
        <Route path="/admin" exact={true} component={Admin} />
     </Switch>

   </div>
  );
}

export default App;
