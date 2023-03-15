const express = require("express");
const cors = require("cors"); // เปิดการ Block Cors
const { sendRequestGetJson } = require("./function/service.js");

const http = require("http");

const fetch = require("node-fetch");
const { start } = require("repl");
const app = express(); // ไว้ Config ค่าต่างๆ
const PORT = process.env.PORT || 8080;

app.use(express.json()); //รับ parameter Json
app.use(express.urlencoded({ extended: true })); //รับ parameter URL Encode

app.use(cors()); // เปิดการ Block Cors

app.get("/getsolr/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?q=_text_:` +
        keyword +`*`+
        `&q.op=OR&indent=true&facet=true&facet.field=title&facet.field=genre&facet.mincount=1&wt=json&rows=300&start=0`
    );
  
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getsolrbyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?q=id:` +
        id +
        `&q.op=OR&indent=true&facet=true&facet.field=title&facet.field=genre&facet.mincount=1&wt=json`
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getsolrbygenre/:genre", async (req, res) => {
  const genre = req.params.genre;
  

  try {
    // const data = await sendRequestGetJson(
    //   `http://localhost:8983/solr/anime/select?indent=true&q.op=OR&q=genre:`+genre
    // );
    if (genre.split(",").length > 1) {
      data = await sendRequestGetJson(
        `http://localhost:8983/solr/anime/select?indent=true&rows=300&start=0&q.op=OR&q=genre:`+`"`+genre+` "`
      );
    }else{
      data = await sendRequestGetJson(
        `http://localhost:8983/solr/anime/select?indent=true&rows=300&start=0&q.op=OR&q=genre:`+`"`+genre+`"`
      );
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getsolrbygenreor/:genre", async (req, res) => {
  const genre = req.params.genre;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?indent=true&q.op=OR&q=genre:`+`*`+genre+`*`+`&rows=300&start=0`
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});
  


app.get("/getsolrbygenreandkeyword/:genre/:keyword", async (req, res) => {
  const genre = req.params.genre;
  const keyword = req.params.keyword;
  try {
    
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?q=_text_:` +
        keyword +
        `&q.op=AND&indent=true&facet=true&facet.field=title&facet.field=genre&facet.mincount=1&wt=json&rows=300&start=0&fq=genre:`+`*`+genre+`*`
    );
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getsolrbyairedandkeyword/:aired/:keyword", async (req, res) => {
  const aired = req.params.aired;
  const keyword = req.params.keyword;
  try {

    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?q=_text_:` +
        keyword +
        `&q.op=AND&indent=true&facet=true&facet.field=title&facet.field=genre&facet.mincount=1&wt=json&rows=300&start=0&fq=aired:`+`*`+aired+`*`
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getsolrbyaired/:aired", async (req, res) => {
  const aired = req.params.aired;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?indent=true&rows=300&start=0&q.op=OR&q=aired:`+`"`+aired+`"`
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getsolrbyairedandgenre/:aired/:genre", async (req, res) => {
  const aired = req.params.aired;
  const genre = req.params.genre;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?indent=true&rows=300&start=0&q.op=AND&q=aired:`+`"`+aired+`"`+`&fq=genre:`+`*`+genre+`*`
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getsolrbyairedandgenreandkeyword/:aired/:genre/:keyword", async (req, res) => {
  const aired = req.params.aired;
  const genre = req.params.genre;
  const keyword = req.params.keyword;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?q=_text_:` +
        keyword +
        `&q.op=AND&indent=true&facet=true&facet.field=title&facet.field=genre&facet.mincount=1&wt=json&rows=300&start=0&fq=year:`+`*`+aired+`*`+`&fq=genre:`+`*`+genre+`*`
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getfacetaired", async (req, res) => {
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/anime/select?indent=true&rows=0&start=0&q.op=OR&q=*:*&facet=true&facet.field=aired&facet.mincount=1&wt=json`
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});





//กรณีไม่พบ Method เปิดแจ้งเตือน
app.use((req, res, next) => {
  res.status(404).json({ error: "Page not found" });
});

//ให้ run ที่ port ตาม Config
app.listen(PORT, () => {
  console.log("run on : " + PORT);
});

