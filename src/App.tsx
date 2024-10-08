import React from "react";
import { Table } from "./components/table/Table";
import { observer } from "mobx-react-lite";
import { store } from "./state/store";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import { useConnectSocket } from "./hooks/useConnectSocket";

const App = observer(() => {
     const [current, setCurrent] = React.useState(0);

     useConnectSocket();

     React.useEffect(() => {
          store.fetchData();
     }, []);

     return (
          <div className="App">
               {store.isLoading && <LinearProgress />}
               {store.data.length ? (
                    <>
                         <div style={{ display: "flex" }}>
                              <Table
                                   clock
                                   switch={setCurrent}
                                   data={store.data[current]}
                                   isConnected={store.isConnected}
                              />
                         </div>
                    </>
               ) : null}
               {!!store.snackbar && (
                    <Snackbar
                         open
                         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                         onClose={() => store.setSnackBar(null)}
                         autoHideDuration={6000}
                    >
                         <Alert {...store.snackbar} onClose={() => store.setSnackBar(null)} />
                    </Snackbar>
               )}
          </div>
     );
});

export default App;
