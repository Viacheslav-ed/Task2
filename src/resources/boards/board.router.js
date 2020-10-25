const router = require('express').Router();
const { asyncHandleError } = require('./../../common/error-handling');
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.json(Board.toResponse(board));
  })
);

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.json(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
