export interface SearchParams {
  q: string;
  country?: string;
  search_lang?: string;
  ui_lang?: string;
  count?: number;
  offset?: number;
  safesearch?: "strict" | "moderate" | "off";
  freshness?: "pd" | "pw" | "pm" | "py";
  text_decorations?: boolean;
  spellcheck?: boolean;
  result_filter?: string;
  goggles_id?: string;
  units?: "metric" | "imperial";
  extra_snippets?: boolean;
  summary?: boolean;
}

// Base types
interface MetaUrl {
  scheme: string;
  netloc: string;
  hostname?: string;
  favicon: string;
  path: string;
}

interface Thumbnail {
  src: string;
  original?: string;
}

interface Language {
  main: string;
}

interface Profile {
  name: string;
  long_name: string;
  url?: string;
  img?: string;
}

interface DataProvider {
  type: "external";
  name: string;
  url: string;
  long_name?: string;
  img?: string;
}

interface Unit {
  value: number;
  units: string;
}

interface Rating {
  ratingValue: number;
  bestRating: number;
  reviewCount?: number;
  profile?: Profile;
  is_tripadvisor?: boolean;
}

interface Price {
  price: string;
  price_currency: string;
}

interface PostalAddress {
  type: "PostalAddress";
  country?: string;
  postalCode?: string;
  streetAddress?: string;
  addressRegion?: string;
  addressLocality?: string;
  displayAddress: string;
}

interface Contact {
  email?: string;
  telephone?: string;
}

interface DayOpeningHours {
  abbr_name: string;
  full_name: string;
  opens: string;
  closes: string;
}

interface OpeningHours {
  current_day?: DayOpeningHours[];
  days?: DayOpeningHours[];
}

interface Action {
  type: string;
  url: string;
}

interface ImageProperties {
  url: string;
  resized: string;
  placeholder: string;
  height?: number;
  width?: number;
  format?: string;
  content_size?: string;
}

interface Image {
  thumbnail?: Thumbnail;
  url?: string;
  properties?: ImageProperties;
}

// Thing and Person types
interface Thing {
  type: "thing" | "person" | "contact_point" | "organization";
  name: string;
  url?: string;
  thumbnail?: Thumbnail;
}

interface Person extends Thing {
  type: "person";
}

interface ContactPoint extends Thing {
  type: "contact_point";
  telephone?: string;
  email?: string;
}

interface Organization extends Thing {
  type: "organization";
  contact_points?: ContactPoint[];
}

// Result types
interface Result {
  title: string;
  url: string;
  is_source_local: boolean;
  is_source_both: boolean;
  description?: string;
  page_age?: string;
  page_fetched?: string;
  profile?: Profile;
  language?: Language;
  family_friendly?: boolean;
}

interface LocationWebResult extends Result {
  meta_url?: MetaUrl;
}

interface VideoData {
  duration?: string;
  views?: string;
  creator?: string;
  publisher?: string;
  thumbnail?: Thumbnail;
  tags?: string[];
  author?: Profile;
  is_family_friendly?: boolean;
}

interface MovieData {
  name?: string;
  description?: string;
  url?: string;
  thumbnail?: Thumbnail;
  release_date?: string;
  directors?: Person[];
  actors?: Person[];
  rating?: Rating;
  duration?: string;
  genre?: string[];
  query?: string;
}

interface ForumData {
  forum_name: string;
  num_answers?: number;
  score?: string;
  title?: string;
  question?: string;
  top_comment?: string;
}

interface QA {
  question: string;
  answer: string;
  title: string;
  url: string;
  meta_url?: MetaUrl;
}

interface Answer {
  text: string;
  author?: string;
  upvoteCount?: number;
  downvoteCount?: number;
}

interface QAPage {
  question: string;
  answer?: Answer;
}

interface Book {
  title: string;
  author?: Person[];
  date_published?: string;
  price?: Price;
  pages?: number;
  publisher?: Person;
  rating?: Rating;
}

interface Article {
  author?: Person[];
  date_published?: string;
  publisher?: Organization;
  thumbnail?: Thumbnail;
  is_family_friendly?: boolean;
}

interface Offer {
  url: string;
  priceCurrency: string;
  price: string;
}

interface Product {
  type: "Product";
  name: string;
  category?: string;
  price: string;
  thumbnail?: Thumbnail;
  description?: string;
  offers?: Offer[];
  rating?: Rating;
}

interface Review {
  type: "review";
  name: string;
  thumbnail?: Thumbnail;
  description?: string;
  rating?: Rating;
}

interface TripAdvisorReview {
  title: string;
  description: string;
  date: string;
  rating?: Rating;
  author?: Person;
  url?: string;
  language?: string;
}

interface Reviews {
  results?: TripAdvisorReview[];
  viewMoreUrl?: string;
  foreign_language?: unknown;
}

interface PictureResults {
  viewMoreUrl?: string;
  results?: Thumbnail[];
}

interface CreativeWork {
  name: string;
  thumbnail?: Thumbnail;
  rating?: Rating;
}

interface MusicRecording {
  name: string;
  thumbnail?: Thumbnail;
  rating?: Rating;
}

interface Software {
  name?: string;
  author?: string;
  version?: string;
  codeRepository?: string;
  homepage?: string;
  datePublisher?: string;
  is_npm?: boolean;
  is_pypi?: boolean;
  stars?: number;
  forks?: number;
  ProgrammingLanguage?: string;
}

interface HowTo {
  text: string;
  name?: string;
  url?: string;
  image?: string[];
}

interface Recipe {
  title: string;
  description: string;
  thumbnail?: Thumbnail;
  url?: string;
  domain?: string;
  favicon_url?: string;
  total_time?: string;
  prep_time?: string;
  cook_time?: string;
  ingredients?: string[];
  instructions?: HowTo[];
  servings?: string;
  calories?: string;
  rating?: Rating;
  category?: string;
  cuisine?: string;
  video?: VideoData;
}

// Deep result types
interface VideoResult extends Result {
  type: "video_result";
  video?: VideoData;
  meta_url?: MetaUrl;
  thumbnail?: Thumbnail;
  age?: string;
}

interface ButtonResult {
  type: "button_result";
  title: string;
  url: string;
}

interface DeepResult {
  news?: Result[];
  buttons?: ButtonResult[];
  videos?: VideoResult[];
  images?: Image[];
}

// Location result types
interface LocationResult extends Result {
  type: "location_result";
  id?: string;
  provider_url: string;
  coordinates?: number[];
  zoom_level: number;
  thumbnail?: Thumbnail;
  postal_address?: PostalAddress;
  opening_hours?: OpeningHours;
  contact?: Contact;
  price_range?: string;
  rating?: Rating;
  distance?: Unit;
  profiles?: DataProvider[];
  reviews?: Reviews;
  pictures?: PictureResults;
  action?: Action;
  serves_cuisine?: string[];
  category?: string[];
  icon_category?: string;
  location_web_results?: LocationWebResult;
  timezone?: string;
  utc_offset?: string;
}

interface LocationDescription {
  type: "local_description";
  id: string;
  description?: string;
}

// Search result types
interface SearchResult extends Result {
  type: "search_result" | "discussion";
  subtype: "generic";
  is_live: boolean;
  deep_results?: DeepResult;
  schemas?: unknown[];
  meta_url?: MetaUrl;
  thumbnail?: Thumbnail;
  age?: string;
  language?: Language;
  location?: LocationResult;
  video?: VideoData;
  movie?: MovieData;
  faq?: QA[];
  qa?: QAPage;
  book?: Book;
  rating?: Rating;
  article?: Article;
  product?: Product;
  review?: Review;
  product_cluster?: Product[];
  cluster?: {
    type: string;
    results?: Result[];
  };
  creative_work?: CreativeWork;
  music_recording?: MusicRecording;
  music_review?: Review;
  software?: Software;
  recipe?: Recipe;
  organization?: Organization;
  content_type?: string;
  extra_snippets?: string[];
}

interface DiscussionResult extends SearchResult {
  type: "discussion";
  data?: ForumData;
}

interface NewsResult extends Result {
  type: "news_result";
  meta_url?: MetaUrl;
  source?: string;
  breaking?: boolean;
  is_live?: boolean;
  thumbnail?: Thumbnail;
  age?: string;
  extra_snippets?: string[];
}

// Infobox types
interface AbstractGraphInfobox extends Result {
  type: "infobox";
  position: number;
  label?: string;
  category?: string;
  long_desc?: string;
  thumbnail?: Thumbnail;
  attributes?: string[];
  profiles?: Profile[] | DataProvider[];
  website?: string;
  ratings?: Rating[];
  providers?: DataProvider[];
  distance?: Unit;
  images?: Thumbnail[];
  movie?: MovieData;
}

interface GenericInfobox extends AbstractGraphInfobox {
  subtype: "generic";
  found_in_urls?: string[];
}

interface EntityInfobox extends AbstractGraphInfobox {
  subtype: "entity";
}

interface QAInfobox extends AbstractGraphInfobox {
  subtype: "code";
  data?: QA;
  meta_url?: MetaUrl;
}

interface InfoboxWithLocation extends AbstractGraphInfobox {
  subtype: "location";
  is_location: boolean;
  coordinates?: number[];
  zoom_level: number;
  location?: LocationResult;
}

interface InfoboxPlace extends AbstractGraphInfobox {
  subtype: "place";
  location?: LocationResult;
}

type Infobox =
  | GenericInfobox
  | EntityInfobox
  | QAInfobox
  | InfoboxWithLocation
  | InfoboxPlace;

// Query type
interface Query {
  original: string;
  show_strict_warning?: boolean;
  altered?: string;
  safesearch?: boolean;
  is_navigational?: boolean;
  is_geolocal?: boolean;
  local_decision?: string;
  local_locations_idx?: number;
  is_trending?: boolean;
  is_news_breaking?: boolean;
  ask_for_location?: boolean;
  language?: Language;
  spellcheck_off?: boolean;
  country?: string;
  bad_results?: boolean;
  should_fallback?: boolean;
  lat?: string;
  long?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  header_country?: string;
  more_results_available?: boolean;
  custom_location_label?: string;
  reddit_cluster?: string;
}

// Result reference for mixed response
interface ResultReference {
  type: string;
  index?: number;
  all: boolean;
}

// Rich callback types
interface RichCallbackHint {
  vertical: string;
  callback_key: string;
}

interface RichCallbackInfo {
  type: "rich";
  hint?: RichCallbackHint;
}

interface Summarizer {
  type: "summarizer";
  key: string;
}

// Main response section types
interface Discussions {
  type: "search";
  results?: DiscussionResult[];
  mutated_by_goggles?: boolean;
}

interface FAQ {
  type: "faq";
  results?: QA[];
}

interface GraphInfobox {
  type: "graph";
  results?: Infobox[];
}

interface Locations {
  type: "locations";
  results?: LocationResult[];
}

interface MixedResponse {
  type: "mixed";
  main?: ResultReference[];
  top?: ResultReference[];
  side?: ResultReference[];
}

interface News {
  type: "news";
  results?: NewsResult[];
  mutated_by_goggles?: boolean;
}

interface Videos {
  type: "videos";
  results?: VideoResult[];
  mutated_by_goggles?: boolean;
}

interface Search {
  type: "search";
  results?: SearchResult[];
  family_friendly?: boolean;
}

// Main response types
export interface WebSearchApiResponse {
  type: "search";
  discussions?: Discussions;
  faq?: FAQ;
  infobox?: GraphInfobox;
  locations?: Locations;
  mixed?: MixedResponse;
  news?: News;
  query?: Query;
  videos?: Videos;
  web?: Search;
  summarizer?: Summarizer;
  rich?: RichCallbackInfo;
}

export interface LocalPoiSearchApiResponse {
  type: "local_pois";
  results?: LocationResult[];
}

export interface LocalDescriptionsSearchApiResponse {
  type: "local_descriptions";
  results?: LocationDescription[];
}

// Union type for all possible API responses
export type BraveSearchApiResponse =
  | WebSearchApiResponse
  | LocalPoiSearchApiResponse
  | LocalDescriptionsSearchApiResponse;
