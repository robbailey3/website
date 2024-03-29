package openai

type Completion struct {
  Id      string `json:"id"`
  Object  string `json:"object"`
  Created int    `json:"created"`
  Model   string `json:"model"`
  Choices []struct {
    Text         string      `json:"text"`
    Index        int         `json:"index"`
    Logprobs     interface{} `json:"logprobs"`
    FinishReason string      `json:"finish_reason"`
  } `json:"choices"`
  Usage struct {
    PromptTokens     int `json:"prompt_tokens"`
    CompletionTokens int `json:"completion_tokens"`
    TotalTokens      int `json:"total_tokens"`
  } `json:"usage"`
}

type Edit struct {
  Object  string `json:"object"`
  Created int    `json:"created"`
  Choices []struct {
    Text  string `json:"text"`
    Index int    `json:"index"`
  } `json:"choices"`
  Usage struct {
    PromptTokens     int `json:"prompt_tokens"`
    CompletionTokens int `json:"completion_tokens"`
    TotalTokens      int `json:"total_tokens"`
  } `json:"usage"`
}
