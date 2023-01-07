package activities

import (
  "time"
)

type StravaActivity struct {
  Id            int64  `json:"id"`
  ResourceState int    `json:"resource_state"`
  ExternalId    string `json:"external_id"`
  UploadId      int64  `json:"upload_id"`
  Athlete       struct {
    Id            int `json:"id"`
    ResourceState int `json:"resource_state"`
  } `json:"athlete"`
  Name               string    `json:"name"`
  Distance           float64   `json:"distance"`
  MovingTime         int       `json:"moving_time"`
  ElapsedTime        int       `json:"elapsed_time"`
  TotalElevationGain float64   `json:"total_elevation_gain"`
  Type               string    `json:"type"`
  SportType          string    `json:"sport_type"`
  StartDate          time.Time `json:"start_date"`
  StartDateLocal     time.Time `json:"start_date_local"`
  Timezone           string    `json:"timezone"`
  UtcOffset          float64   `json:"utc_offset"`
  StartLatlng        []float64 `json:"start_latlng"`
  EndLatlng          []float64 `json:"end_latlng"`
  AchievementCount   int       `json:"achievement_count"`
  KudosCount         int       `json:"kudos_count"`
  CommentCount       int       `json:"comment_count"`
  AthleteCount       int       `json:"athlete_count"`
  PhotoCount         int       `json:"photo_count"`
  Map                struct {
    Id              string `json:"id"`
    Polyline        string `json:"polyline"`
    ResourceState   int    `json:"resource_state"`
    SummaryPolyline string `json:"summary_polyline"`
  } `json:"map"`
  Trainer              bool        `json:"trainer"`
  Commute              bool        `json:"commute"`
  Manual               bool        `json:"manual"`
  Private              bool        `json:"private"`
  Flagged              bool        `json:"flagged"`
  GearId               string      `json:"gear_id"`
  FromAcceptedTag      bool        `json:"from_accepted_tag"`
  AverageSpeed         float64     `json:"average_speed"`
  MaxSpeed             float64     `json:"max_speed"`
  AverageCadence       float64     `json:"average_cadence"`
  AverageTemp          float64     `json:"average_temp"`
  AverageWatts         float64     `json:"average_watts"`
  WeightedAverageWatts float64     `json:"weighted_average_watts"`
  Kilojoules           float64     `json:"kilojoules"`
  DeviceWatts          bool        `json:"device_watts"`
  HasHeartrate         bool        `json:"has_heartrate"`
  MaxWatts             float64     `json:"max_watts"`
  ElevHigh             float64     `json:"elev_high"`
  ElevLow              float64     `json:"elev_low"`
  PrCount              int         `json:"pr_count"`
  TotalPhotoCount      int         `json:"total_photo_count"`
  HasKudoed            bool        `json:"has_kudoed"`
  WorkoutType          int         `json:"workout_type"`
  SufferScore          interface{} `json:"suffer_score"`
  Description          string      `json:"description"`
  Calories             float64     `json:"calories"`
  SegmentEfforts       []struct {
    Id            int64  `json:"id"`
    ResourceState int    `json:"resource_state"`
    Name          string `json:"name"`
    Activity      struct {
      Id            int64 `json:"id"`
      ResourceState int   `json:"resource_state"`
    } `json:"activity"`
    Athlete struct {
      Id            int `json:"id"`
      ResourceState int `json:"resource_state"`
    } `json:"athlete"`
    ElapsedTime    int       `json:"elapsed_time"`
    MovingTime     int       `json:"moving_time"`
    StartDate      time.Time `json:"start_date"`
    StartDateLocal time.Time `json:"start_date_local"`
    Distance       float64   `json:"distance"`
    StartIndex     int       `json:"start_index"`
    EndIndex       int       `json:"end_index"`
    AverageCadence float64   `json:"average_cadence"`
    DeviceWatts    bool      `json:"device_watts"`
    AverageWatts   float64   `json:"average_watts"`
    Segment        struct {
      Id            int       `json:"id"`
      ResourceState int       `json:"resource_state"`
      Name          string    `json:"name"`
      ActivityType  string    `json:"activity_type"`
      Distance      float64   `json:"distance"`
      AverageGrade  float64   `json:"average_grade"`
      MaximumGrade  float64   `json:"maximum_grade"`
      ElevationHigh float64   `json:"elevation_high"`
      ElevationLow  float64   `json:"elevation_low"`
      StartLatlng   []float64 `json:"start_latlng"`
      EndLatlng     []float64 `json:"end_latlng"`
      ClimbCategory int       `json:"climb_category"`
      City          string    `json:"city"`
      State         string    `json:"state"`
      Country       string    `json:"country"`
      Private       bool      `json:"private"`
      Hazardous     bool      `json:"hazardous"`
      Starred       bool      `json:"starred"`
    } `json:"segment"`
    KomRank      interface{}   `json:"kom_rank"`
    PrRank       interface{}   `json:"pr_rank"`
    Achievements []interface{} `json:"achievements"`
    Hidden       bool          `json:"hidden"`
  } `json:"segment_efforts"`
  SplitsMetric []struct {
    Distance            float64 `json:"distance"`
    ElapsedTime         int     `json:"elapsed_time"`
    ElevationDifference float64 `json:"elevation_difference"`
    MovingTime          int     `json:"moving_time"`
    Split               int     `json:"split"`
    AverageSpeed        float64 `json:"average_speed"`
    PaceZone            int     `json:"pace_zone"`
  } `json:"splits_metric"`
  Laps []struct {
    Id            int64  `json:"id"`
    ResourceState int    `json:"resource_state"`
    Name          string `json:"name"`
    Activity      struct {
      Id            int `json:"id"`
      ResourceState int `json:"resource_state"`
    } `json:"activity"`
    Athlete struct {
      Id            int `json:"id"`
      ResourceState int `json:"resource_state"`
    } `json:"athlete"`
    ElapsedTime        int       `json:"elapsed_time"`
    MovingTime         int       `json:"moving_time"`
    StartDate          time.Time `json:"start_date"`
    StartDateLocal     time.Time `json:"start_date_local"`
    Distance           float64   `json:"distance"`
    StartIndex         int       `json:"start_index"`
    EndIndex           int       `json:"end_index"`
    TotalElevationGain float64   `json:"total_elevation_gain"`
    AverageSpeed       float64   `json:"average_speed"`
    MaxSpeed           float64   `json:"max_speed"`
    AverageCadence     float64   `json:"average_cadence"`
    DeviceWatts        bool      `json:"device_watts"`
    AverageWatts       float64   `json:"average_watts"`
    LapIndex           int       `json:"lap_index"`
    Split              int       `json:"split"`
  } `json:"laps"`
  Gear struct {
    Id            string `json:"id"`
    Primary       bool   `json:"primary"`
    Name          string `json:"name"`
    ResourceState int    `json:"resource_state"`
    Distance      int    `json:"distance"`
  } `json:"gear"`
  PartnerBrandTag interface{} `json:"partner_brand_tag"`
  Photos          struct {
    Primary struct {
      Id       interface{} `json:"id"`
      UniqueId string      `json:"unique_id"`
      Urls     struct {
        Field1 string `json:"100"`
        Field2 string `json:"600"`
      } `json:"urls"`
      Source int `json:"source"`
    } `json:"primary"`
    UsePrimaryPhoto bool `json:"use_primary_photo"`
    Count           int  `json:"count"`
  } `json:"photos"`
  HighlightedKudosers []struct {
    DestinationUrl string `json:"destination_url"`
    DisplayName    string `json:"display_name"`
    AvatarUrl      string `json:"avatar_url"`
    ShowName       bool   `json:"show_name"`
  } `json:"highlighted_kudosers"`
  HideFromHome             bool   `json:"hide_from_home"`
  DeviceName               string `json:"device_name"`
  EmbedToken               string `json:"embed_token"`
  SegmentLeaderboardOptOut bool   `json:"segment_leaderboard_opt_out"`
  LeaderboardOptOut        bool   `json:"leaderboard_opt_out"`
}

func (s *StravaActivity) MapToDatabaseModel() *CreateActivityRequest {
  var splits []Split
  for _, split := range s.SplitsMetric {
    splits = append(splits, Split{
      Distance:            split.Distance,
      ElapsedTime:         split.ElapsedTime,
      MovingTime:          split.MovingTime,
      ElevationDifference: split.ElevationDifference,
      AverageSpeed:        split.AverageSpeed,
    })
  }
  var segments []Segment
  for _, segment := range s.SegmentEfforts {
    segments = append(segments, Segment{
      Name:        segment.Name,
      ElapsedTime: segment.ElapsedTime,
      MovingTime:  segment.MovingTime,
      Distance:    segment.Distance,
    })
  }

  return &CreateActivityRequest{
    StravaId:           s.Id,
    Type:               s.SportType,
    Name:               s.Name,
    Description:        s.Description,
    Distance:           s.Distance,
    MovingTime:         s.MovingTime,
    ElapsedTime:        s.ElapsedTime,
    TotalElevationGain: s.TotalElevationGain,
    StartDate:          s.StartDate,
    StartDateLocal:     s.StartDateLocal,
    GearName:           s.Gear.Name,
    MapPolyline:        s.Map.SummaryPolyline,
    Segments:           segments,
    Splits:             splits,
    Image: Image{
      UrlSmall: s.Photos.Primary.Urls.Field1,
      UrlLarge: s.Photos.Primary.Urls.Field2,
    },
  }
}

type Split struct {
  Distance            float64 `json:"distance"`
  ElapsedTime         int     `json:"elapsedTime"`
  MovingTime          int     `json:"movingTime"`
  ElevationDifference float64 `json:"elevationDifference"`
  AverageSpeed        float64 `json:"averageSpeed"`
}

type Segment struct {
  Name        string  `json:"name"`
  ElapsedTime int     `json:"elapsedTime"`
  MovingTime  int     `json:"movingTime"`
  Distance    float64 `json:"distance"`
}

type Image struct {
  UrlSmall string `json:"urlSmall"`
  UrlLarge string `json:"urlLarge"`
}

type Activity struct {
  Id                 string    `json:"id"`
  StravaId           int64     `json:"stravaId"`
  Type               string    `json:"type"`
  Name               string    `json:"name"`
  Description        string    `json:"description"`
  Distance           float64   `json:"distance"`
  MovingTime         int       `json:"movingTime"`
  ElapsedTime        int       `json:"elapsedTime"`
  TotalElevationGain float64   `json:"totalElevationGain"`
  StartDate          time.Time `json:"startDate"`
  StartDateLocal     time.Time `json:"startDateLocal"`
  GearName           string    `json:"gearName"`
  MapPolyline        string    `json:"mapPolyline"`
  DateAdded          time.Time `json:"dateAdded"`
  DateModified       time.Time `json:"dateModified"`
  Segments           []Segment `json:"segments"`
  Splits             []Split   `json:"splits"`
  Image              Image     `json:"image"`
}

type CreateActivityRequest struct {
  StravaId           int64     `json:"stravaId"`
  Type               string    `json:"type"`
  Name               string    `json:"name"`
  Description        string    `json:"description"`
  Distance           float64   `json:"distance"`
  MovingTime         int       `json:"movingTime"`
  ElapsedTime        int       `json:"elapsedTime"`
  TotalElevationGain float64   `json:"totalElevationGain"`
  StartDate          time.Time `json:"startDate"`
  StartDateLocal     time.Time `json:"startDateLocal"`
  GearName           string    `json:"gearName"`
  MapPolyline        string    `json:"mapPolyline"`
  DateAdded          time.Time `json:"dateAdded"`
  DateModified       time.Time `json:"dateModified"`
  Segments           []Segment `json:"segments"`
  Splits             []Split   `json:"splits"`
  Image              Image     `json:"image"`
}
