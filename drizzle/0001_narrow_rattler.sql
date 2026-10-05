CREATE TABLE "site_content" (
	"key" text PRIMARY KEY NOT NULL,
	"items" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
