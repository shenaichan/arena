export type Channel = {
  title: string;
  created_at: Date;
  updated_at: Date;
  added_to_at: Date;
  published: boolean;
  open: boolean;
  collaboration: boolean;
  collaborator_count: number;
  slug: string;
  length: number;
  kind: string;
  status: string;
  user_id: number;
  metadata: UserMetadata;
  contents: Content[];
  share_link: string;
  follower_count: number;
  can_index: boolean;
  owner_type: string;
  owner_id: number;
  owner_slug: string;
  "nsfw?": boolean;
  state: string;
  user: User;
  group: Group;
  id: number;
  base_class: string;
  class: string;
};

export type Contents = {
  contents: Content[];
};

export type Content = {
  title: string;
  updated_at: Date;
  created_at: Date;
  state: string;
  comment_count: number;
  generated_title: string;
  content_html: null | string;
  description_html: null | string;
  visibility: string;
  content: null | string;
  description: null | string;
  source: Source | null;
  image: Image | null;
  embed: Embed | null;
  attachment: null;
  metadata: ContentMetadata | null;
  id: number;
  base_class: string;
  class: string;
  user: User;
  position: number;
  selected: boolean;
  connection_id: number;
  connected_at: Date;
  connected_by_user_id: number;
  connected_by_username: string;
  connected_by_user_slug: string;
};

export type Embed = {
  url: null;
  type: string;
  title: string;
  author_name: string;
  author_url: string;
  source_url: null;
  thumbnail_url: null;
  width: number;
  height: number;
  html: string;
};

export type Image = {
  filename: string;
  content_type: string;
  updated_at: Date;
  thumb: Display;
  square: Display;
  display: Display;
  large: Display;
  original: Original;
};

export type Display = {
  url: string;
};

export type Original = {
  url: string;
  file_size: number;
  file_size_display: string;
};

export type ContentMetadata = {};

export type Source = {
  url: string;
  title: null | string;
  provider: Provider;
};

export type Provider = {
  name: string;
  url: string;
};

export type User = {
  created_at: Date;
  slug: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  avatar: string;
  avatar_image: AvatarImage;
  channel_count: number;
  following_count: number;
  profile_id: number;
  follower_count: number;
  initials: string;
  can_index: boolean;
  metadata: UserMetadata;
  is_premium: boolean;
  is_lifetime_premium: boolean;
  is_supporter: boolean;
  is_exceeding_connections_limit: boolean;
  is_confirmed: boolean;
  is_pending_reconfirmation: boolean;
  is_pending_confirmation: boolean;
  badge: string;
  id: number;
  base_class: string;
  class: string;
};

export type AvatarImage = {
  thumb: string;
  display: string;
};

export type UserMetadata = {
  description: null | string;
};

export type Group = {
  created_at: Date;
  updated_at: Date;
  name: string;
  description: string;
  visibility: number;
  slug: string;
  id: number;
  base_class: string;
  class: string;
};
