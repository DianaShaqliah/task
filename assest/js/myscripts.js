console.clear();

let vm = new Vue({
  el: "#app",
  data: {
    receivedData: "",
    amount: 0,
    from: "USD",
    to: "ILS",
    fromSymbol: "$",
    toSymbol: "₪",
    result: 0,
    isBTNdisabled: false,
    loading: false
  },

  methods: {
    convert: function() {
      let key = `${this.from}_${this.to}`;
      this.loading = true;
      fetch(
        `https://free.currconv.com/api/v7/convert?q=${key}&apiKey=60912bf20be81c490e36`
      )
        .then(resp => resp.json())
        .then(reponse => {
          this.loading = false;
          this.result = (this.amount * reponse.results[key].val).toFixed(4);
        });
      this.$refs.convert.blur();
    }
  },
  mounted: function() {
    fetch(
      "https://free.currconv.com/api/v7/currencies?apiKey=60912bf20be81c490e36"
    )
      .then(resp => resp.json())
      .then(data => {
        this.receivedData = data.results;
      });
  },
  computed: {
    checkBTN: function() {
      if (
        this.amount <= 0 ||
        this.amount == "" ||
        this.amount == " " ||
        this.loading === true
      ) {
        this.isBTNdisabled = true;
      } else {
        this.isBTNdisabled = false;
      }
      return this.isBTNdisabled;
    }
  },
  watch: {
    from: function() {
      let symbol = this.receivedData[this.from].currencySymbol;
      if (symbol == undefined) {
        this.fromSymbol = "N/A";
      } else this.fromSymbol = symbol;
    },
    to: function() {
      let symbol = this.receivedData[this.to].currencySymbol;
      if (symbol == undefined) {
        this.toSymbol = "N/A";
      } else this.toSymbol = symbol;
    }
  }
});

// ParticlesJS Config.
particlesJS("particles-js", {
  particles: {
    number: {
      value: 130,
      density: {
        enable: true,
        value_area: 500
      }
    },

    color: {
      value: "#ffffff"
    },

    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },

      polygon: {
        nb_sides: 5
      }
    },

    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },

    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },

    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },

    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },

  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab"
      },

      onclick: {
        enable: true,
        mode: "push"
      },

      resize: true
    },

    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },

      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 3
      },

      repulse: {
        distance: 200,
        duration: 0.4
      },

      push: {
        particles_nb: 4
      },

      remove: {
        particles_nb: 2
      }
    }
  },

  retina_detect: true
});
