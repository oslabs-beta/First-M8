import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const AddEditCard = ({ clusterArray, setClusterArray }) => {
  console.log("addeditcard");
  let { name } = useParams();
  const { history } = useHistory();
  const [thisCluster, setThisCluster] = useState(() => {
    if (name !== "new") {
      for (const el in clusterArray) {
        if (el.name === name) return el;
      }
    }
    return {
      name: "",
      ipAddress: "",
      port: 3000,
    };
  });

  async function handleSumbit(e) {
    e.preventDefault();
    if (name === "new") {
      await fetch("/settings/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thisCluster),
      })
        .then((res) => res.json())
        .then((result) => {
          setClusterArray([...clusterArray, thisCluster]);
        })
        .catch((e) => console.log(e));
    } else {
      await fetch(`/settings/${name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thisCluster),
      })
        .then((res) => res.json())
        .then((result) => {
          const newArray = clusterArray.filter((el) => el.name !== name);
          setClusterArray([...newArray, thisCluster]);
        })
        .catch((e) => console.log(e));
    }
    history.push("/settings");
    return;
  }

  function handleChange(e) {
    let updatedCluster = { ...thisCluster };
    if (e.target.id === "name") {
      updatedCluster = { ...updatedCluster, name: e.target.value };
    } else if (e.target.id === "ipaddress") {
      updatedCluster = { ...updatedCluster, ipAddress: e.target.value };
    } else if (e.target.id === "port") {
      updatedCluster = { ...updatedCluster, port: e.target.value };
    }
    setThisCluster(updatedCluster);
    return;
  }

  async function handleDelete(e) {
    await fetch("/settings/:name", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thisCluster),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const newClusterArray = clusterArray.filter((el) => el.name !== name);
          setClusterArray(newClusterArray);
          history.push("/settings");
        } else {
          console.log("error when deleting data!");
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <div>
      <form onSubmit={(e) => handleSumbit(e)}>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          id="name"
          placeholder="K8s Cluster 1"
          value={thisCluster.name}
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="ipaddress">IP Address </label>
        <input
          type="text"
          id="ipaddress"
          placeholder="192.168.0.1"
          value={thisCluster.ipAddress}
          onChange={(e) => handleChange(e)}
        ></input>
        <label htmlFor="port">Port </label>
        <input
          type="text"
          id="port"
          placeholder="3000"
          value={thisCluster.port}
          onChange={(e) => handleChange(e)}
        ></input>
        <button type="submit">Submit</button>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </form>
    </div>
  );
};

export default AddEditCard;
