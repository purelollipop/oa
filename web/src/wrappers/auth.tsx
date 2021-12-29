import React from 'react';
import { Redirect } from 'umi'
interface props {
}

const auth: React.FC<props> = (props) => {
  console.log('props~~~',props)
  let token:string | null = window.sessionStorage.getItem('token');
  let first:string | null = window.sessionStorage.getItem('first')
  console.log(token)
  console.log(Boolean(token))
  if(token){
    return (<>{props.children}</>);
  }else{
    return <Redirect to="/login" />;
  }
};

export default auth


