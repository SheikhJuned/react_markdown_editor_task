import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Header from "../Header";
import MenuBar from "../MenuBar";
import MarkDownScreen from "../MarkDownScreen";

import {LoginContext} from "../../contexts";

const axios = require('axios').default;


LogInScreen.propTypes = {

};

function LogInScreen(props) {

    const {jwt}=useContext(LoginContext)


    const [markdowns,setMarkdowns]=useState([])
    const [isloading,setisloading]=useState(true)

    const get_markdown_list=async ()=>{
        axios.get('http://localhost:4000/api/posts/',{
            headers: {
                'auth-token': jwt
            }
        })
            .then(function (response) {
                // handle success
                console.log(response.data.markdowns);
                setMarkdowns(response.data.markdowns)
                setisloading(false)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                alert("error:",error.toString())
                setisloading(false)
            })
    }


    useEffect(()=>{
        get_markdown_list()
    },[])


    const [enableDrawer, setenableDrawer] = React.useState(false);

    return (
        <div >
            {/*<div className="App">*/}

            <Header enableDrawer={enableDrawer} setenableDrawer={setenableDrawer}/>
            {isloading ? <p>loading</p>:
            <MenuBar enableDrawer={enableDrawer} setenableDrawer={setenableDrawer}
                     markdowns={markdowns} setMarkdowns={setMarkdowns}
            />

            }

        </div>
    );
}

export default LogInScreen;
