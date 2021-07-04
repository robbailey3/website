import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectID } from 'mongodb';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

jest.mock('./tasks.service.ts');

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService]
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: getTasks', () => {
    it('should call tasksService->find', () => {
      controller.getTasks({ sort: {}, limit: 100, skip: 0, filter: {} });

      expect(service.find).toHaveBeenCalled();
    });
  });

  describe('[METHOD]: getTaskById', () => {
    let validID;
    const invalidID = 'invalid_id';
    beforeEach(() => {
      validID = new ObjectID().toHexString();
    });
    it('should have a getTaskById method', () => {
      expect(controller.getTaskById).toBeDefined();
    });
    it('should throw an error when an invalid ID is passed', () => {
      expect(() => controller.getTaskById(invalidID)).toThrow(
        BadRequestException
      );
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.getTaskById(validID)).not.toThrow(
        BadRequestException
      );
    });

    it('should call tasksService->findOne when called', () => {
      controller.getTaskById(validID);
      expect(service.findOne).toHaveBeenCalled();
    });
    it('should pass the ID parameter to the service', () => {
      controller.getTaskById(validID);
      expect(service.findOne).toHaveBeenCalledWith({
        _id: ObjectID.createFromHexString(validID)
      });
    });
  });
  describe('[METHOD]: insertTask', () => {
    it('should have a insertTask method', () => {
      expect(controller.insertTask).toBeDefined();
    });

    it('should call tasksService->insertOne when called', () => {
      controller.insertTask(new TaskDto());
      expect(service.insertOne).toHaveBeenCalled();
    });
    it('should pass the new task to the service', () => {
      const newTask = new TaskDto();
      controller.insertTask(newTask);
      expect(service.insertOne).toHaveBeenCalledWith(newTask);
    });
  });
  describe('[METHOD]: updateTask', () => {
    const validID = new ObjectID().toHexString();
    const invalidID = 'invalid_id';

    it('should have a updateTask method', () => {
      expect(controller.updateTask).toBeDefined();
    });
    it('should throw an error when an invalid ID is passed', () => {
      expect(() =>
        controller.updateTask(invalidID, new UpdateTaskDto())
      ).toThrow(BadRequestException);
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() =>
        controller.updateTask(validID, new UpdateTaskDto())
      ).not.toThrow(BadRequestException);
    });

    it('should call tasksService->findOneAndUpdate when called', () => {
      controller.updateTask(validID, new UpdateTaskDto());
      expect(service.findOneAndUpdate).toHaveBeenCalled();
    });
    it('should pass the filter and updated task to the service', () => {
      const updatedTask = new UpdateTaskDto();
      controller.updateTask(validID, updatedTask);
      expect(service.findOneAndUpdate).toHaveBeenCalledWith(
        {
          _id: ObjectID.createFromHexString(validID)
        },
        { $set: updatedTask }
      );
    });
  });

  describe('[METHOD]: deleteTask', () => {
    const validID = new ObjectID().toHexString();
    const invalidID = 'invalid_id';

    it('should have a deleteTask method', () => {
      expect(controller.deleteTask).toBeDefined();
    });
    it('should throw an error when an invalid ID is passed', () => {
      expect(() => controller.deleteTask(invalidID)).toThrow(
        BadRequestException
      );
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.deleteTask(validID)).not.toThrow(
        BadRequestException
      );
    });

    it('should call tasksService->findOneAndUpdate when called', () => {
      controller.deleteTask(validID);
      expect(service.findOneAndDelete).toHaveBeenCalled();
    });
    it('should pass the filter by Id to the service', () => {
      controller.deleteTask(validID);
      expect(service.findOneAndDelete).toHaveBeenCalledWith({
        _id: ObjectID.createFromHexString(validID)
      });
    });
  });
});
