use `kstreams-poc-db`;


create table if not exists users (
    id int not null auto_increment,
    name varchar(255) not null,
    created_at timestamp default current_timestamp,
    last_updated_at timestamp default current_timestamp on update current_timestamp,
    primary key (id)
);


create table if not exists transfers (
    id int not null auto_increment,
    from_user_id int not null,
    to_user_id int not null,
    amount decimal(10,2) not null,
    created_at timestamp default current_timestamp,
    last_updated_at timestamp default current_timestamp on update current_timestamp,
    primary key (id)
);