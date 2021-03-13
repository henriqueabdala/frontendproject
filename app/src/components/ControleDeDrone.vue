<template>
  <v-app>
    <DroneHeader />
    <DroneMain />
  </v-app>
</template>

<script>
import DroneHeader from "@/components/DroneHeader.vue";
import DroneMain from "@/components/DroneMain.vue";
export default {
  name: "ControleDeDrone",
  components: {
    DroneHeader,
    DroneMain,
  },
  methods: {
    getDrone() {
      const rOpt = {
        method: "GET",
        redirect: "follow",
        headers: new Headers({
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }),
      };
      fetch("http://localhost:3000/", rOpt)
        .then((response) => response.json())
        .then((r) => {
          console.log(r);
          this.drones = r.map((drone) => {
            return {
              droneId: drone.droneId,
              rastreamento: drone.rastreamento ? "Ligado" : "Desligado",
              temperatura: `${drone.temperatura}ºC`,
              umidade: `${drone.umidade}%`,
              latitude: drone.latitude,
              longitude: drone.longitude,
            };
          });
        })
        .catch((error) => console.log("error", error));
    },
    postDrone() {
      const raw = {
        droneId: this.id,
        latitude: this.latitude,
        longitude: this.longitude,
        temperatura: this.temperatura,
        umidade: this.umidade,
        rastreamento: this.rastreamento,
      };
      const rOpt = {
        method: "POST",
        redirect: "follow",
        body: JSON.stringify(raw),
        headers: new Headers({
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        }),
      };
      fetch("http://localhost:3000/", rOpt)
        .then((response) => response.text())
        .then((r) => {
          alert(r);
          this.getDrone();
          this.id = null;
          this.latitude = null;
          this.longitude = null;
          this.temperatura = 15;
          this.umidade = 30;
          this.rastreamento = true;
        })
        .catch((error) => console.log("error", error));
    },
  },
  mounted() {
    this.getDrone();
    this.changePositionDrone();
  },
  data: () => ({
    id: null,
    latitude: null,
    longitude: null,
    temperatura: 15,
    umidade: 30,
    rastreamento: true,
    drones: [],
    headers: [
      { text: "ID", value: "droneId" },
      { text: "Rastreamento", value: "rastreamento" },
      { text: "Latitude", value: "latitude" },
      { text: "Longitude", value: "longitude" },
      { text: "Temperatura (ºC)", value: "temperatura" },
      { text: "Umidade (%)", value: "umidade" },
    ],
  }),
};
</script>