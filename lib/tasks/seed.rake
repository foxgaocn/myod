task :create_products => :environment do
    Product.create!({
      name: "Swiss护肝片120粒",
      user_id: 3
    });

    Product.create!({
      name: "Swiss蔓越莓120粒",
      user_id: 3
    });

    Product.create!({
      name: "Karicare金装一段",
      user_id: 3
    });

    Product.create!({
      name: "Karicare金装二段",
      user_id: 3
    });

    Product.create!({
      name: "Karicare金装三段",
      user_id: 3
    });

    Product.create!({
      name: "Karicare金装四段",
      user_id: 3
    });

    Product.create!({
      name: "羊奶皂",
      user_id: 3
    });
  end