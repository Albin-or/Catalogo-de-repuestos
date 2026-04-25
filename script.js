fetch('https://partsouq.com/en/catalog/genuine/vehicle?c=Toyota&ssd=%24%2AKwG9iZj81c3qpeTWx_K8u-Xx0dbIuba7uqiHtPz6yd3BxcfEgZa60P76_s_ZwNGXioC9tMrH3cHFx5f4l8rKpsvfod7MqK6t687yquztq7H2-vW6v7q7v6ylq_SxsK20qarfz9vKm_ror6zk6620qamTnfW_vsWlzsvBz4X66K-s_-uttKnlo7Soo66r7ubqq7H27PbyAAAAAAb-9ow%3D%24&vid=0&q=').then((response) => {
  console.log(response.ok) // true si la petición salió bien
  console.log(response.status) // código HTTP, por ejemplo 200
})