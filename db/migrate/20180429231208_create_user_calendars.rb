class CreateUserCalendars < ActiveRecord::Migration[5.2]
  def change
    create_table :user_calendars do |t|
      t.integer :user_id
      t.integer :calendar_id

      t.timestamps
    end
  end
end
