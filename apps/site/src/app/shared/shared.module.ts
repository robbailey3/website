import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from './services/github/github.service';

@NgModule({
  declarations: [],
  providers: [GithubService],
  imports: [CommonModule]
})
export class SharedModule {}
