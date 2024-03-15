import { Component, OnInit } from '@angular/core';
import { DesignTacoService } from 'src/app/service/design-taco-service/design-taco.service';
import { TacoService } from 'src/app/service/taco-service/taco.service';
import { Ingredient } from 'src/app/tables/ingredient';
import { Taco } from 'src/app/tables/taco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design-taco',
  templateUrl: './design-taco.component.html',
  styleUrls: ['./design-taco.component.scss', '../../app.component.scss']
})
export class DesignTacoComponent implements OnInit{

  errorMessageIngredients: string | null = null;

  errorMessageName: string | null = null;

  errorPresent: boolean = false;

  ingredientsByType: { [key: string]: Ingredient[] } = {};

  taco: Taco = new Taco();

  constructor(private designTacoService: DesignTacoService, private router: Router) {}

  ngOnInit(): void {
    this.getIngredientsGroupedByType();
  }

  getIngredientsGroupedByType(): void {
    this.designTacoService.getIngredientsGroupedByType().subscribe(data => {
      this.ingredientsByType = data;
    });
  }

  createTaco(): void {
    const allCategoriesSelected = Object.values(this.ingredientsByType).every(category => {
      return this.taco.ingredients.some(ingredient => category.includes(ingredient));
    });
  

    if (!allCategoriesSelected) {
      // If not all categories have at least one selected ingredient, show an error
      this.errorMessageIngredients = "Select at least one ingredient from each categrory.";
      this.errorPresent = true;
    } 
    
    if (this.taco.name == "") {
      this.errorMessageName = "Please name your taco.";
      this.errorPresent = true;
    } 
    

    if (this.errorPresent == false){
      // If validation passes, proceed to create the taco
      this.designTacoService.createTacoFromIngredients(this.taco).subscribe(data => {
        console.log("The taco: " + this.taco + " has been saved.");
        // Optional: redirect to another page or show success message
      });

      this.errorMessageIngredients = null;
      this.errorMessageName = null;
    }

    this.errorPresent = false;
  }

  toggleIngredient(event: any, ingredient: Ingredient): void {
    if(event.target.checked) {
      this.addIngredientToTaco(ingredient);
    } else {
      this.removeIngredientFromTaco(ingredient);
    }
  }

  addIngredientToTaco(ingredient: Ingredient): void {
    this.taco.ingredients.push(ingredient);
  }

  removeIngredientFromTaco(ingredient: Ingredient): void {
    const index = this.taco.ingredients.indexOf(ingredient);
    if(index > -1) {
      this.taco.ingredients.splice(index, 1);
    }

    console.log("The following ingredient has been removed from the taco " + ingredient);
  }

  redirectToOrderWindow(path: string) {
    this.router.navigate([path]);
  }

}
