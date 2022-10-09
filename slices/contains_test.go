package slices

import (
	"testing"
)

func TestContains(t *testing.T) {
	type args struct {
		s []string
		e string
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{"Should return true when the slice contains the given value", args{s: []string{"one", "two"}, e: "two"}, true},
		{"Should return false when the slice contains the given value", args{s: []string{"one", "two"}, e: "three"}, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Contains(tt.args.s, tt.args.e); got != tt.want {
				t.Errorf("Contains() = %v, want %v", got, tt.want)
			}
		})
	}
}
