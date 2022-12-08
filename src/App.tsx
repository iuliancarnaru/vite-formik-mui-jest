import { MaterialUIForm2 } from './Form2';

function App() {
  return (
    <div className="App">
      <MaterialUIForm2 onSubmit={(values) => console.log(values)} />
    </div>
  );
}

export default App;
