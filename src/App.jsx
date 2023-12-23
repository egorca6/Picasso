import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./pages/PostList";
import PostDetails from "./pages/PostDetails";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/apiService";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});
setupListeners(store.dispatch);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetails />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
