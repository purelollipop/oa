import React from 'react';
import { Redirect } from 'umi'
interface props {
}

const auth: React.FC<props> = (props) => {
  let token:string | null = window.sessionStorage.getItem('token');
  let first:string | null = window.sessionStorage.getItem('first')
  if(token){
    return (<>{props.children}</>);
  }else{
    return <Redirect to="/login" />;
  }
};

export default auth


