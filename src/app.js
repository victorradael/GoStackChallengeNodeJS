const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const newRegister = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(newRegister);

  return response.send(newRegister);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find((repository) => repository.id === id);

  if (repository) {
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
  } else {
    return response.status(400).send({ error: "Repositorio nao encontrado" });
  }

  return response.send(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if(repositoryIndex && repositoryIndex !== -1){
    repositories.splice(repositoryIndex, 1);
  } else {
    return response.status(400).send({error: "Repositorio nao encontrado"});
  }
  

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
  
    const repository = repositories.find((repository) => repository.id === id);
  
    if (repository) {
      repository.likes++;
      
    } else {
      return response.status(400).send({ error: "Repositorio nao encontrado" });
    }

    return response.send(repository)
});

module.exports = app;