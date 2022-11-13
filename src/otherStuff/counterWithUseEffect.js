import { useEffect, useState } from "react";

// 1. Run once - set status as online
// 2. Run after state changed, filter data
// 3. Run after props changed 
//      - use effect can also depend on a prop ==> Fetch new API from back-end

export function Counters(props) {
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);

    useEffect(() => {
        // Use to fetch data from server
        console.log('This is happening only once when the component is first loading');
    }, []);

    useEffect(() => {
        console.log("This is happening every time that the component is being rendered");
    })

    useEffect(() => {
        console.log("Rendered component again since counter has changed and now is " + counter);
    }, [counter]);

    useEffect(() => {
        console.log("Second counter has changed");
    }, [counter2]);



    return (<div>
        <div>Counter | {counter}</div>
        <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
        
        <div>Counter 2 | {counter2}</div>
        <button onClick={() => setCounter2(counter2 + 1)}>Increase Counter2</button>
    </div>);
}