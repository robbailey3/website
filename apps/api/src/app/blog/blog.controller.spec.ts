import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectID } from 'mongodb';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogPostDto } from './dto/blogpost.dto';
import { UpdateBlogPostDto } from './dto/update-blogpost.dto';

jest.mock('./blog.service');

describe('[CONTROLLER: BlogController]', () => {
  let controller: BlogController;
  let service: BlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [BlogService]
    }).compile();

    controller = module.get<BlogController>(BlogController);
    service = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('[METHOD]: getPosts', () => {
    it('should call blogService->find', () => {
      controller.getPosts({ filter: {}, sort: {}, limit: 0, skip: 0 });
      expect(service.find).toHaveBeenCalled();
    });

    it('should pass the filter and options to the service', () => {
      controller.getPosts({ filter: {}, sort: {}, limit: 0, skip: 0 });
      expect(service.find).toHaveBeenCalledWith(
        {},
        { sort: {}, skip: 0, limit: 0 }
      );
    });

    it('should return an array of blog posts', async () => {
      const expectedResult = [new BlogPostDto()];
      service.find = jest.fn().mockResolvedValue(expectedResult);

      const result = await controller.getPosts({
        filter: {},
        sort: {},
        limit: 0,
        skip: 0
      });

      expect(result).toEqual(expectedResult);
    });
  });
  describe('[METHOD]: getPostById', () => {
    const validID = new ObjectID().toHexString();
    const invalidID = 'invalid_id';

    it('should have a findOne method', () => {
      expect(controller.getPostById).toBeDefined();
    });
    it('should throw an error when an invalid ID is passed', () => {
      expect(() => controller.getPostById(invalidID)).toThrow(
        BadRequestException
      );
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.getPostById(validID)).not.toThrow(
        BadRequestException
      );
    });

    it('should call blogService->findOne', () => {
      controller.getPostById(validID);

      expect(service.findOne).toHaveBeenCalled();
    });
  });
  describe('[METHOD]: insertPost', () => {
    it('should have a insertPost method', () => {
      expect(controller.insertPost).toBeDefined();
    });

    it('should call blogService->insertOne', async () => {
      await controller.insertPost(new BlogPostDto());

      expect(service.insertOne).toHaveBeenCalled();
    });
  });
  describe('[METHOD]: publishPost', () => {
    const validID = new ObjectID().toHexString();
    const invalidID = 'invalid_id';
    it('should call blogService->findOneAndUpdate', async () => {
      service.findOne = jest.fn().mockResolvedValue(new BlogPostDto());

      await controller.publishPost(validID);
      expect(service.findOneAndUpdate).toHaveBeenCalled();
    });

    it('should throw an error when an invalid ID is passed', () => {
      expect(() => controller.getPostById(invalidID)).toThrow(
        BadRequestException
      );
    });

    it('should not throw an error when a valid ID is provided', () => {
      expect(() => controller.getPostById(validID)).not.toThrow(
        BadRequestException
      );
    });
  });
  describe('[METHOD]: updatePost', () => {
    const validID = new ObjectID().toHexString();
    const invalidID = 'invalid-id';

    beforeEach(() => {
      service.findOne = jest.fn().mockResolvedValue(new BlogPostDto());
    });

    it('should have an updatePost method', () => {
      expect(controller.updatePost).toBeDefined();
    });

    it('should throw an error when an invalid ID is passed', async () => {
      await expect(() =>
        controller.updatePost(invalidID, new UpdateBlogPostDto())
      ).rejects.toThrow(BadRequestException);
    });

    it('should not throw an error when a valid ID is provided', async () => {
      await expect(() =>
        controller.updatePost(validID, new UpdateBlogPostDto())
      ).not.toThrow(BadRequestException);
    });
    it('should call blogService->findOne', async () => {
      await controller.updatePost(validID, new UpdateBlogPostDto());

      expect(service.findOne).toHaveBeenCalled();
    });

    it('should call blogService->findOneAndUpdate', async () => {
      await controller.updatePost(validID, new UpdateBlogPostDto());

      expect(service.findOneAndUpdate).toHaveBeenCalled();
    });
  });
  describe('[METHOD]: deletePost', () => {
    const validID = new ObjectID().toHexString();
    const invalidID = 'invalid-id';

    it('should throw an error when an invalid ID is passed', async () => {
      expect(() => controller.deletePost(invalidID)).toThrow(
        BadRequestException
      );
    });

    it('should not throw an error when a valid ID is provided', async () => {
      await expect(() => controller.deletePost(validID)).not.toThrow(
        BadRequestException
      );
    });
    it('should call blogService', async () => {
      await controller.deletePost(validID);

      expect(service.findOneAndDelete).toHaveBeenCalled();
    });
  });
});
