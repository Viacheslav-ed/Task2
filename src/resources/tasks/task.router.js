const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { asyncHandleError } = require('./../../common/error-handling');

router.route('/').get(
  asyncHandleError(async (req, res) => {
    const tasks = await tasksService.getAll();
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  asyncHandleError(async (req, res) => {
    const task = await tasksService.get(req.params.id);
    res.json(Task.toResponse(task));
  })
);

router.route('/').post(
  asyncHandleError(async (req, res) => {
    const task = await tasksService.create(
      new Task({
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      })
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').put(
  asyncHandleError(async (req, res) => {
    const task = await tasksService.update(
      new Task({
        id: req.params.id,
        title: req.body.title,
        order: req.body.order,
        description: req.body.description,
        userId: req.body.userId,
        boardId: req.params.boardId,
        columnId: req.body.columnId
      })
    );
    res.json(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  asyncHandleError(async (req, res) => {
    await tasksService.remove(req.params.id);
    res.sendStatus(204);
  })
);

module.exports = router;
