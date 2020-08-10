# Wedding Dress Frontend Introduction


[TOC]

## 開發工具與版本、環境設定

前端開發環境: 
* Node 8^
* Python2

開發工具： VS CODE
* VS Plugin: 
  * 必備: eslint, EditorConfig
  * 自選: DotENV, vscode-styled-components, Todo Tree

GitLub: https://gitlab.devpack.cc/David_Tsai/hst_wiordering

## 啟動
初次啟動:
``` sh
npm install
npm run i18n:update
npm run start
```
> http://0.0.0.0:5000/ or http://127.0.0.1:5000/

## 修改devlep Port
 在scripts/start 第44行，修改後面數值
 ``` sh
 const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 5000;
 ```
 或是在.env 加上
 ``` sh
 PORT=5000
 ```

## 打包
```sh
npm run build
```
執行後目錄會多一個build的資料夾，即為靜態檔網頁

## 套件
* 核心
  * axios
  * history
  * i18next
    * https://github.com/i18next/i18next
  * react-i18next
    * https://react.i18next.com/
  * react-redux
  * react-router-dom
  * redux
  * redux-form
    * https://redux-form.com/8.2.2/docs/gettingstarted.md/
  * redux-thunk
  * styled-components
    * https://styled-components.com/
  * webpack + babel
* 選用
  * ant design
    * https://ant.design/
  * react-dnd
    * https://react-dnd.github.io/react-dnd/about
  * react-slick
    * https://react-slick.neostack.com/docs/get-started

## 新增頁面
放在src/modules底下

## router
1. 在src/routes/PathConstants.js登記路徑
``` sh
const PATH = {
  MAIN: '/',
  LOGIN: '/Login',
  PRODUCTMANAGEMENT: '/ProductManagement',
  ALBUMMANAGEMENT: '/AlbumManagement',
  ACCOUNTMANAGEMENT: '/AccountManagement',
};
```
2. 在src/routes/routes.js中登記頁面
   分兩個部分
   * login頁面與主畫面
   ``` sh
   const routes = () => (
     <Authentication>
       <Switch>
         <Route path={PATH.LOGIN} render={WaitingComponent(lazy(() => import('../modules/Login/Login')))} />
         <Route path={PATH.MAIN} render={WaitingComponent(lazy(() => import('../modules/MainPage/MainPage')))} />
       </Switch>
     </Authentication>
   );
   ```
   * 主畫面在區分頁面
   ``` sh
   const appRoutes = [
     { path: PATH.PRODUCTMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Product/Product'))) },
     { path: PATH.ALBUMMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Album/Album'))) },
     { path: PATH.ACCOUNTMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Account/Account'))) },
   ];
   ```
3. redirect:
``` sh
this.props.history.push(PATH.PRODUCTMANAGEMENT);
```

## 更新字串
1. 在google試算表登記字串: https://docs.google.com/spreadsheets/d/1afZBMBgCBzszI5aQRgJisAkNUjE6n-BqUf2ZN_aDoNc/edit?copiedFromTrash#gid=1803461926
2. 執行指令:
``` sh
npm run i18n:update
```
3. HOC使用方式:
* 引入react-i18next套件，使用withTranslation
``` sh
import { withTranslation } from 'react-i18next';

class MyComponent extends Component {
  ......
}

export default withTranslation()(MyComponent);
```
* 從props取出function t
``` sh
const { t } = this.props;
```
* 使用:
``` sh
<span className="title">{t('COMMON.TITLE')}</span>
```
* 也有HOOK版請參考官方文件

4. googleapis套件版本不能太新

## 參數設定
在src/utils/Config中設定該專案要使用的參數
區分為develop跟production兩種環境
``` shn
const APPCONFIG = process.env.NODE_ENV === 'production' ? {
  brand: '正式',
  BackEndWebApi: '/',
  intervalsTime: 10000,
} : {
  brand: '測試',
  BackEndWebApi: 'http://10.35.41.17:3050',
  intervalsTime: 120000,
};
```

## Loading
* compoent載入中的loading
  1. 在 src/routes/LoadingPage 可以修改Loading畫面樣式
  2. 使用方法
     * 將Loading使用在 src/routes/routes 的 WaitingComponent HOC Component
     ``` shn
     export const WaitingComponent = (Component) => (props) => (
       <Suspense fallback={<LoadingPage />}>
       <Component {...props} />
     </Suspense>
     );
     ```
     * 引入Compoent時，先使用React的lazy函數，再用WaitingComponent Component
     ``` sh
     const appRoutes = [
       { path: PATH.PRODUCTMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Product/Product'))) },
       { path: PATH.ALBUMMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Album/Album'))) },
       { path: PATH.ACCOUNTMANAGEMENT, render: WaitingComponent(lazy(() => import('../modules/Account/Account'))) },
     ];
     );
     ```
   
* 呼叫Api顯示的loading
  1. 在 src/components/Loading 可以修改Loading畫面樣式
  2. 使用方法
     * 呼叫Api時自動顯示Loading方式(方法解說)
       在 src/utils/Api 中自動擷取api的request以及response，顯示隱藏Loading
       toggleLoader為控制Loading開關的function
       ``` sh
       const toggleLoader = (visible) => store.dispatch({ type: userTypes.SET_LOADER_VISIBLE, visible });
       instance.interceptors.request.use((config) => {
         if (!spinnerHide.includes(config.url)) {
           responseQueue.push(config.url);
           toggleLoader(true);
         }
         return config;
       });
 
       instance.interceptors.response.use((response) => {
        responseQueue = responseQueue.filter((data) => data !== response.config.url);
        if (responseQueue.length === 0) toggleLoader(false);
        return response;
       }, (error) => {
         ...
       });
       ```
     * 除了呼叫api以外要顯示Loading時可以使用在 src/actions/user 中的 setLoaderVisible action

## Redux
1. 建立Action
   * 建立Action Type :
     在src/actions/types中新增type
     ``` sh
     export const userTypes = {
       SET_LOADER_VISIBLE: 'USER/SET_LOADER_VISIBLE',
       GET_DEVICETYPE_LIST: 'USER/GET_DEVICETYPE_LIST',
     };
     ```
   * 在src/actions/中的檔案寫入action function並引入type使用
     * 一般版本
       ``` sh
       import { userTypes } from './types';
    
       export function setLoaderVisible(visible) {
         return { type: userTypes.SET_LOADER_VISIBLE, visible };
       }
       ```
     * API版本
       ``` sh
       import { userTypes } from './types';
    
       export function getDeviceTypeList() {
         return (dispatch) => {
           Axios.get(`${deviceApiUrl}/deviceTypes`)
             .then((res) => {
               dispatch({ type: userTypes.GET_DEVICETYPE_LIST, res });
             });
         };
       }
       ```
2. 建立Reducer
   * 在src/reduces建立檔案
   * 引入Type，真對不同Type做資料處理
     ``` sh
     import { userTypes } from '../actions/types';
  
     const User = (state = initialState, action) => {
       switch (action.type) {
         ...資料處理
       }
     };
     ```
   * reducer整合
     在src/reduces/index檔案引入新加的redcer
     ``` sh
     import user from './user';
  
     export default combineReducers({
       user,
       
       device,
     });
     ```
4. store建立在 src/utils/Store
   在App.js 使用 Store
6. 頁面使用
   引入react-redux套件，使用connect
   這樣在componet就可以在pors取用
   ``` sh
   import { connect } from 'react-redux';
   import { setEditUserModelVisible } from '../../actions/user';

   class MyComponent extends Component {
     const { visible, setVisible } = this.props;
     ......
   }

   export default connect(
     (state) => ({
       visible: state.user.editModel,
     }),
     (dispatch) => ({
       setVisible: (visible) => dispatch(setEditUserModelVisible(visible)),
     })
   )(MyComponent);
   ```

## API
* 引用在 src/utils/Api 撰寫的Axios來呼叫API
  ``` sh
  import Axios from '../utils/Api';

  Axios.get(`${deviceApiUrl}/deviceTypes`)
    .then((res) => {
      ...
    });
   ```
* 呼叫Api會自動顯示loading，若不要顯示可在src/utils/Api調整
  加入api path到spinnerHide陣列中
  ``` sh
  const spinnerHide = [
    "/api/getProduct",
  ];
  ```
* Api錯誤時統一處理，可在src/utils/Api調整
  如下判斷ststus=401，移除tocken重整頁面
  ``` sh
  instance.interceptors.response.use((response) => {
    ...
  }, (error) => {
    message.error(error.message);
    if (error.response) {
      if (error.response.status === 401) {
        sessionStorage.removeItem('userData');
        window.location.replace('');
      }
    }
    ...
  });
  ```
  
## Redux From
* Field Component創建在src/components/Form底下
* Field validate funtion在src/utils/FormValidate中
