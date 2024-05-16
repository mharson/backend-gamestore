const client = require("./client");
const util = require("util");

// GET - /api/video-games
async function getAllVideoGames() {
  try {
    const { rows: videoGames } = await client.query(`SELECT * FROM videoGames`);
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videoGames
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games
async function createVideoGame(body) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
        INSERT INTO videoGames (name, description, price, "inStock", "isPopular", "imgUrl")
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;`,
      [
        body.name,
        body.description,
        body.price,
        body.inStock,
        body.isPopular,
        body.imgUrl,
      ]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// PUT - /api/video-games/:id
async function updateVideoGame(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(",");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `UPDATE videoGames
        SET ${setString}
        WHERE id=${id}
        RETURNING *;`,
      Object.values(fields)
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/video-games/:id
async function deleteVideoGame(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `DELETE FROM videoGames
    WHERE id=$1
    RETURNING *;`,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
