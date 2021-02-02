export interface Incident {
    incident_log_id?: number,
    fk_product_id?: number,
    inl_IM?: string,
    inl_description?: string,
    escalation_date?: Date,
    scaled_to?: string,
    inl_status?: number,
    closing_date?: Date,
    inl_comments?: string,
    user_processed?: string
}