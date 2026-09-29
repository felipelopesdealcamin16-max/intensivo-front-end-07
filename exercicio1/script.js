// ==========================================
// EXERCÍCIO 1
// BUSCAR DADOS DE UMA API
// ==========================================

function buscarPokemon() {

    let numero = Math.floor(Math.random() * 20) + 1;

    fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)

        .then(resposta => resposta.json())

        .then(pokemon => {

            document.getElementById("pokemon").innerHTML = `

                <h3>${pokemon.name}</h3>

                <img
                    src="${pokemon.sprites.front_default}"
                    alt="${pokemon.name}"
                >

                <p>Altura: ${pokemon.height}</p>

                <p>Peso: ${pokemon.weight}</p>

            `;

        })

        .catch(() => {

            document.getElementById("pokemon").innerHTML =
                "<p>Erro ao buscar o Pokémon.</p>";

        });
}



// ==========================================
// EXERCÍCIO 2
// CAMPO DE BUSCA
// ==========================================

function pesquisarPokemon() {

    let nome = document
        .getElementById("nomePokemon")
        .value
        .toLowerCase()
        .trim();


    if (nome === "") {

        document.getElementById("resultadoPesquisa").innerHTML =
            "<p>Digite o nome de um Pokémon.</p>";

        return;
    }


    fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`)

        .then(resposta => {

            if (!resposta.ok) {

                throw new Error("Não encontrado");

            }

            return resposta.json();

        })

        .then(pokemon => {

            document.getElementById("resultadoPesquisa").innerHTML = `

                <h3>${pokemon.name}</h3>

                <img
                    src="${pokemon.sprites.front_default}"
                    alt="${pokemon.name}"
                >

                <p>Altura: ${pokemon.height}</p>

                <p>Peso: ${pokemon.weight}</p>

            `;

        })

        .catch(() => {

            document.getElementById("resultadoPesquisa").innerHTML =
                "<p>Pokémon não encontrado.</p>";

        });

}



// ==========================================
// EXERCÍCIO 3
// LOGIN COM API
// ==========================================

function fazerLogin() {

    let usuario = document.getElementById("usuario").value;

    let senha = document.getElementById("senha").value;

    let mensagem = document.getElementById("mensagemLogin");


    if (usuario === "" || senha === "") {

        mensagem.innerHTML = "Preencha todos os campos.";

        mensagem.style.color = "red";

        return;
    }


    fetch("https://dummyjson.com/auth/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            username: usuario,

            password: senha

        })

    })

        .then(resposta => {

            if (!resposta.ok) {

                throw new Error("Login inválido");

            }

            return resposta.json();

        })

        .then(dados => {

            mensagem.innerHTML =
                "Login realizado com sucesso!";

            mensagem.style.color = "green";

            console.log(dados);

        })

        .catch(() => {

            mensagem.innerHTML =
                "Usuário ou senha inválidos.";

            mensagem.style.color = "red";

        });

}



// ==========================================
// EXERCÍCIO 4
// LISTA DE USUÁRIOS
// ==========================================

function carregarUsuarios() {

    let lista = document.getElementById("listaUsuarios");

    lista.innerHTML = "<p>Carregando usuários...</p>";


    fetch("https://jsonplaceholder.typicode.com/users")

        .then(resposta => resposta.json())

        .then(usuarios => {

            lista.innerHTML = "";


            usuarios.forEach(usuario => {

                lista.innerHTML += `

                    <div class="usuario">

                        <h3>${usuario.name}</h3>

                        <p>
                            Usuário: ${usuario.username}
                        </p>

                        <p>
                            Email: ${usuario.email}
                        </p>

                        <p>
                            Cidade: ${usuario.address.city}
                        </p>

                    </div>

                `;

            });

        })

        .catch(() => {

            lista.innerHTML =
                "<p>Erro ao carregar usuários.</p>";

        });

}



// ==========================================
// EXERCÍCIO 5
// PREVISÃO DO TEMPO
// ==========================================

function buscarClima() {

    let resultado = document.getElementById("clima");

    resultado.innerHTML =
        "<p>Buscando sua localização...</p>";


    if (!navigator.geolocation) {

        resultado.innerHTML =
            "<p>Seu navegador não suporta localização.</p>";

        return;
    }


    navigator.geolocation.getCurrentPosition(

        function(posicao) {

            let latitude =
                posicao.coords.latitude;

            let longitude =
                posicao.coords.longitude;


            resultado.innerHTML =
                "<p>Buscando informações do clima...</p>";


            let url =
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`;


            fetch(url)

                .then(resposta => resposta.json())

                .then(dados => {

                    let temperatura =
                        dados.current.temperature_2m;

                    let vento =
                        dados.current.wind_speed_10m;


                    resultado.innerHTML = `

                        <div class="clima-box">

                            <h3>Clima atual</h3>

                            <p>
                                Temperatura:
                                ${temperatura} °C
                            </p>

                            <p>
                                Vento:
                                ${vento} km/h
                            </p>

                        </div>

                    `;

                })

                .catch(() => {

                    resultado.innerHTML =
                        "<p>Erro ao buscar o clima.</p>";

                });

        },

        function() {

            resultado.innerHTML =
                "<p>Não foi possível acessar sua localização.</p>";

        }

    );

}