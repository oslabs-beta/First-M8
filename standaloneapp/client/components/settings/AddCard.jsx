import React, { useState } from "react";
import { useParams } from "react-router";

const AddCard = () => {
  return (
    <div>
      <form onSubmit={sumbit}>
        <label htmlFor="name">Name </label>
        <input type='text' id="name" placeholder='K8s Cluster 1'></input>
        <label htmlFor="ipaddress">IP Address </label>
        <input type='text' id="ipaddress" placeholder='192.168.0.1'></input>
        <label htmlFor="port">Port </label>
        <input type='text' id="port" placeholder='3000'></input>
      </form>
    </div>
  );
};

export default AddCard;
