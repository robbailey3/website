package openai

type GetCompletionRequest struct {
  Model       string   `json:"model"`
  Prompt      []string `json:"prompt"`
  Suffix      *string  `json:"suffix,omitempty"`
  MaxTokens   *int     `json:"max_tokens,omitempty"`
  Temperature *float64 `json:"temperature,omitempty"`
  TopP        *float64 `json:"top_p,omitempty"`
  N           *int     `json:"n,omitempty"`
}

type GetEditRequest struct {
  Model       string   `json:"model"`
  Input       string   `json:"input"`
  Instruction string   `json:"instruction"`
  N           *int     `json:"n,omitempty"`
  Temperature *float64 `json:"temperature,omitempty"`
  TopP        *float64 `json:"top_p,omitempty"`
}
