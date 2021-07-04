import { PartialType } from '@nestjs/swagger';
import { BlogPostDto } from './blogpost.dto';

export class UpdateBlogPostDto extends PartialType(BlogPostDto) {}
