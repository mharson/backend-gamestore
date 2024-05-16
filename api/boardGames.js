const express = require("express");
const router = express.Router();

const {
  getAllBoardGames,
  getBoardGameById,
  createBoardGame,
  updateBoardGame,
  deleteBoardGame,
} = require("../db/boardGames");

// GET - /api/board-games
router.get("/", async (req, res, next) => {
  try {
    const boardGames = await getAllBoardGames();
    res.send(boardGames);
  } catch (error) {
    next(error);
  }
});

// GET - /api/board-games/:id
router.get("/:id", async (req, res, next) => {
  try {
    const boardGame = await getBoardGameById(req.params.id);
    res.send(boardGame);
  } catch (error) {
    next(error);
  }
});

// POST - /api/board-games
router.post("/", async (req, res, next) => {
  try {
    const boardGame = await createBoardGame(req.body);
    res.send(boardGame);
  } catch (error) {
    next(error);
  }
});

// PUT - /api/board-games/:id
router.put("/:id", async (req, res, next) => {
  try {
    const boardGame = await updateBoardGame(req.params.id, req.body);
    res.send(boardGame);
  } catch (error) {
    next(error);
  }
});

// DELETE - /api/board-games/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const boardGame = await deleteBoardGame(req.params.id);
    res.send(boardGame);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
