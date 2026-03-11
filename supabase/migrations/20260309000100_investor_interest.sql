CREATE TABLE "investor_interest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"city" text NOT NULL,
	"country" text NOT NULL,
	"referrer" text,
	"amount_usd" numeric(12, 2) NOT NULL,
	"capital_type" text NOT NULL,
	"background" text NOT NULL,
	"how_can_help" text,
	"citizenship" text NOT NULL,
	"not_restricted_country" boolean NOT NULL,
	"is_accredited" boolean,
	"consent_to_store" boolean NOT NULL,
	CONSTRAINT "investor_interest_amount_min_check" CHECK ("investor_interest"."amount_usd" >= 5000),
	CONSTRAINT "investor_interest_capital_type_check" CHECK ("investor_interest"."capital_type" in ('Personal', 'Fund/Family Office'))
);

CREATE INDEX "investor_interest_created_at_idx" ON "investor_interest" USING btree ("created_at" DESC NULLS LAST);
CREATE INDEX "investor_interest_email_idx" ON "investor_interest" USING btree ("email");
